import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { HealthTimelineService } from '@core/services/health-timeline.service';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { TimeInterval, ModelVersion } from '@shared/models/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import {
  IMonitoringAggregationList,
  IMonitoringAggregationVM,
} from '@shared/models/monitoring-aggregation.model';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import * as d3 from 'd3';
import {
  Subject,
  merge,
  Observable,
  combineLatest,
  BehaviorSubject,
  Subscription,
  interval,
} from 'rxjs';
import { startWith, switchMap, tap, filter, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'hs-health-timeline',
  templateUrl: './health-timeline.component.html',
  styleUrls: ['./health-timeline.component.scss'],
  providers: [HealthTimelineService],
  encapsulation: ViewEncapsulation.None,
})
export class HealthTimelineComponent implements OnInit, OnDestroy {
  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  @ViewChild('wrapper', { read: ElementRef })
  wrapper: ElementRef;

  @ViewChild('dataContainer', { read: ElementRef })
  dataContainer: ElementRef;

  @ViewChild('brush', { read: ElementRef })
  brush: ElementRef;

  @Input() metricSpecifications: MetricSpecification[];
  @Input() selectedModelVersion: ModelVersion;
  @Input() live: boolean;

  @Output() stopped: EventEmitter<boolean> = new EventEmitter();
  @Output() started: EventEmitter<boolean> = new EventEmitter();

  // CANVAS
  scale: d3.ScaleTime<number, number>;

  canvasHeight: number;
  canvasWidth: number;

  xAxisTransform = 'translate(0,0)';
  mimimapTransform = 'translate(0,0)';

  readonly MARGIN = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  readonly LINE_HEIGHT = 32;
  readonly MINIMAP_LINE_HEIGHT = 10;
  readonly Y_TITLE_WIDTH = 100;
  readonly X_AXIS_HEIGHT = 10;

  // DATA
  fullLog: IMonitoringAggregationVM;

  brushMove$: Subject<TimeInterval>;
  minimapBrushMove$: Subject<TimeInterval>;

  brushEnd$: Subject<TimeInterval>;
  minimapBrushEnd$: Subject<TimeInterval>;

  displayedTime: BehaviorSubject<TimeInterval> = new BehaviorSubject(null);
  displayedTime$: Observable<TimeInterval>;
  selectedTime$: Observable<TimeInterval>;
  manualSelectInterval: BehaviorSubject<TimeInterval> = new BehaviorSubject(
    null
  );

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  fullLogSub: Subscription;
  detailLogSub: Subscription;

  labels: string[] = [];
  mainMapWidth: number;

  @Output()
  private timeInterval: EventEmitter<TimeInterval> = new EventEmitter();

  private currentLogData: ITimelineLog;

  constructor(
    private timelineService: HealthTimelineService,
    private monitoringService: MonitoringService,
    private cdr: ChangeDetectorRef
  ) {
    this.brushEnd$ = new Subject();
    this.brushMove$ = new Subject();
    this.minimapBrushMove$ = new Subject();
    this.minimapBrushEnd$ = new Subject();
    this.displayedTime$ = merge(
      this.displayedTime.asObservable(),
      this.brushMove$,
      this.minimapBrushMove$
    );
    this.selectedTime$ = merge(
      this.manualSelectInterval.asObservable(),
      this.brushEnd$,
      this.minimapBrushEnd$
    ).pipe(startWith());
  }

  ngOnInit(): void {
    this.canvasWidth = this.calculateCanvasWidth();
    this.mainMapWidth = this.canvasWidth - 120;

    this.fullLogSub = this.getFullAggregation()
      .pipe(
        tap(res => {
          this.loading$.next(false);
          const m = this.metricSpecifications;
          const m2 = this.metricSpecifications.reduce((acc, cur, idx) => {
            acc[m[idx].name] = res[idx];
            return acc;
          }, {});

          this.fullLog = m2;
          this.currentLogData = m2;

          const int = this.timelineService.getMinimumAndMaximumTimestamps(
            this.currentLogData
          );
          const i = { from: int[0], to: int[1] };
          this.manualSelectInterval.next(i);
        })
      )
      .subscribe();

    this.detailLogSub = this.selectedTime$
      .pipe(
        filter(int => !!int && !!int.from),
        tap(timeInterval => {
          this.displayedTime.next(timeInterval);
          this.timeInterval.next(timeInterval);
        }),
        switchMap(timeInterval => {
          this.loading$.next(true);
          return this.getAggregationInInterval(timeInterval);
        }),
        tap(res => {
          this.loading$.next(false);
          const m = this.metricSpecifications;
          const m2 = this.metricSpecifications.reduce((acc, _, idx) => {
            acc[m[idx].name] = res[idx];
            return acc;
          }, {});
          this.currentLogData = m2;
          this.render();
        })
      )
      .subscribe();
  }

  showZoomOut(): boolean {
    return true;
  }

  zoomOut(): void {
    const [from, to] = this.timelineService.getMinimumAndMaximumTimestamps(
      this.fullLog
    );
    this.brushEnd$.next({ from, to });
    this.started.next();
  }

  ngOnDestroy(): void {
    this.fullLogSub.unsubscribe();
    this.detailLogSub.unsubscribe();
  }

  onMinimapBrushEnd(t: TimeInterval) {
    this.minimapBrushEnd$.next(t);
  }
  onMinimapBrushMove(t: TimeInterval) {
    this.minimapBrushMove$.next(t);
  }

  getYLabelTranslate(index: number): string {
    return `translate(0, ${index * this.LINE_HEIGHT + 4})`;
  }

  private getFullAggregation(): Observable<IMonitoringAggregationList> {
    const requests = this.metricSpecifications.map(metricSpecification =>
      this.monitoringService.getAggregation({
        metricSpecification,
        steps: '200',
      })
    );
    return merge(interval(5000).pipe(filter(() => this.live))).pipe(
      exhaustMap(() => combineLatest(...requests))
    );
  }

  private getAggregationInInterval(timeInterval: TimeInterval) {
    const requests = this.metricSpecifications.map(metricSpecification =>
      this.monitoringService.getAggregation({
        metricSpecification,
        from: `${Math.floor(timeInterval.from / 1000)}`,
        till: `${Math.floor(timeInterval.to / 1000)}`,
        steps: '50',
      })
    );

    return combineLatest(...requests);
  }

  private updateBrush() {
    const rowCount = Object.keys(this.currentLogData).length;
    const brush = d3
      .brushX()
      .extent([[0, 0], [this.canvasWidth - 120, 32 * rowCount]]);

    d3.select(this.brush.nativeElement).call(brush);

    brush.on('brush', () => this.onBrushed());
    brush.on('end', () => this.onBrushEnd(brush));
  }

  private onBrushEnd(brush) {
    const evt = d3.event;
    if (!evt.selection) {
      return;
    }

    this.brushEnd$.next({
      from: this.scale.invert(evt.selection[0]).getTime(),
      to: this.scale.invert(evt.selection[1]).getTime(),
    });
    d3.select(this.brush.nativeElement).call(brush.move, null);

    this.stopped.next();
  }

  private onBrushed() {
    const evt = d3.event;
    if (!evt.selection) {
      return;
    }

    this.brushMove$.next({
      from: this.scale.invert(evt.selection[0]).getTime(),
      to: this.scale.invert(evt.selection[1]).getTime(),
    });
  }

  private elementsPositioning() {
    const rowCount = Object.keys(this.currentLogData).length;

    this.xAxisTransform = `translate(0, ${rowCount * this.LINE_HEIGHT})`;
    this.mimimapTransform = `translate(0, ${rowCount * this.LINE_HEIGHT})`;
  }

  private render(): void {
    this.updateCanvasSize();
    this.elementsPositioning();
    this.updateScale();
    this.updateYTitle();
    this.updateDataset();
    this.updateBrush();
    this.cdr.detectChanges();
  }

  private updateScale() {
    if (this.logDataNotEmpty()) {
      this.scale = d3
        .scaleTime()
        .domain(
          this.timelineService.getMinimumAndMaximumTimestamps(
            this.currentLogData
          )
        )
        .range([0, this.canvasWidth - 120]);
    } else {
      const { from, to } = this.displayedTime.getValue();

      this.scale = d3
        .scaleTime()
        .domain([new Date(from), new Date(to)])
        .range([0, this.canvasWidth - 120]);
    }
  }

  private updateYTitle(): void {
    this.labels = Object.keys(this.currentLogData);
  }

  private updateDataset() {
    const self = this;
    const dataRow = Object.values(this.currentLogData);

    d3.select(this.dataContainer.nativeElement)
      .selectAll('g.datarow')
      .data(dataRow)
      .join(
        enterRow => enterRow.append('g').attr('class', 'datarow'),
        updateRow => updateRow,
        exit => exit.remove()
      )
      .attr('transform', (d, idx) => `translate(0, ${idx * 32})`)
      .each(function(data, index) {
        d3.select(this)
          .selectAll('rect')
          .remove();

        d3.select(this)
          .selectAll('rect')
          .data(data)
          .join(
            enter => enter.append('rect').attr('class', 'dataset__rect'),
            update => update,
            exit => exit.remove()
          )
          .call(_ => self.drawRect(_));
      });
  }

  private drawRect(selection) {
    selection
      .filter(d => d.meanValue !== null)
      .classed(
        'dataset-m__rect--s',
        d => d.meanHealth !== null && d.meanHealth === 1
      )
      .classed(
        'dataset-m__rect--f',
        d => d.meanHealth !== null && d.meanHealth < 1
      )
      .classed('dataset-m__rect--u', d => d.meanHealth === null)
      .attr('height', 14)
      .attr('x', d => this.scale(new Date(d.from)))
      .attr(
        'width',
        d => this.scale(new Date(d.till)) - this.scale(new Date(d.from))
      );
  }

  private updateCanvasSize(): void {
    this.canvasHeight = this.calculateCanvasHeight();
    this.canvasWidth = this.calculateCanvasWidth();
    this.mainMapWidth = this.canvasWidth - 120;
  }

  private calculateCanvasHeight(): number {
    const rowCount = Object.keys(this.currentLogData).length;
    return this.MARGIN.top + rowCount * this.LINE_HEIGHT + this.X_AXIS_HEIGHT;
  }

  private calculateCanvasWidth(): number {
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;
    const { width } = wrapperEl.getBoundingClientRect();
    const wrapperPaddingOffest = 24;

    return width - wrapperPaddingOffest;
  }

  private logDataNotEmpty() {
    const data = Object.values(this.currentLogData);
    return data.some(el => el.length > 0);
  }
}
