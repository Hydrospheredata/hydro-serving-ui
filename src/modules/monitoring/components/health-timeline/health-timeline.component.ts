import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { HealthTimelineService } from '@core/services/health-timeline.service';
import { TimeInterval } from '@shared/models/_index';
import { MonitoringAggregation } from '@shared/models/monitoring-aggregation.model';
import { TimelineLog } from '@shared/models/timeline-log.model';
import * as d3 from 'd3';
import * as _ from 'lodash';
import {
  Subject,
  Observable,
  BehaviorSubject,
  Subscription,
  merge,
} from 'rxjs';

@Component({
  selector: 'hs-health-timeline',
  templateUrl: './health-timeline.component.html',
  styleUrls: ['./health-timeline.component.scss'],
  providers: [HealthTimelineService],
  encapsulation: ViewEncapsulation.None,
})
export class HealthTimelineComponent implements OnInit {
  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  @ViewChild('wrapper', { read: ElementRef })
  wrapper: ElementRef;

  @ViewChild('dataContainer', { read: ElementRef })
  dataContainer: ElementRef;

  @ViewChild('brush', { read: ElementRef })
  brush: ElementRef;

  @Input() timeInterval;
  @Input() set fullAggregation(aggr: any) {
    this.fullLog = aggr;
  }
  @Input() set detailedAggregation(aggr: any) {
    this.detailedLog = aggr;
    this.currentLogData = aggr;
    // TODO
    if (this.currentLogData) {
      this.render();
    }
  }

  @Input() isLive: boolean;
  @Input() timeBound: number;

  currentLogData: TimelineLog;

  @Output() stopped: EventEmitter<boolean> = new EventEmitter();
  @Output() started: EventEmitter<boolean> = new EventEmitter();
  @Output() timeIntervalChanged: EventEmitter<
    TimeInterval
  > = new EventEmitter();
  @Output() timeBoundChanged: EventEmitter<number> = new EventEmitter();

  // CANVAS
  scale: d3.ScaleTime<number, number>;
  canvasHeight: number;
  canvasWidth: number;

  xAxisTransform = 'translate(0,0)';
  mimimapTransform = 'translate(0,0)';

  xSublines: number[];
  ySublines: number[];

  readonly MARGIN = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  readonly LINE_HEIGHT = 16;
  readonly MINIMAP_LINE_HEIGHT = 10;
  readonly Y_TITLE_WIDTH = 100;
  readonly X_AXIS_HEIGHT = 10;

  // DATA
  fullLog: MonitoringAggregation;
  detailedLog: MonitoringAggregation;

  brushMove$: Subject<TimeInterval>;
  minimapBrushMove$: Subject<TimeInterval>;

  brushEnd$: Subject<TimeInterval>;
  minimapBrushEnd$: Subject<TimeInterval>;

  displayedTime: BehaviorSubject<TimeInterval> = new BehaviorSubject(null);
  displayedTime$: Observable<TimeInterval>;

  manualSelectInterval: BehaviorSubject<TimeInterval> = new BehaviorSubject(
    null
  );

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  fullLogSub: Subscription;
  detailLogSub: Subscription;

  labels: string[] = [];
  mainMapWidth: number;

  chartTimeWidthParams: Array<{ ms: number; text: string }> = [
    { ms: 900000, text: '15 minutes' },
    { ms: 1800000, text: '30 minutes' },
    { ms: 3600000, text: '1 hour' },
    { ms: 7200000, text: '2 hours' },
    { ms: 14400000, text: '4 hours' },
    { ms: 0, text: 'All time' },
  ];
  chartTimeWidth: number = 0;

  constructor(
    private timelineService: HealthTimelineService,
    private cdr: ChangeDetectorRef
  ) {
    this.brushMove$ = new Subject();
    this.minimapBrushMove$ = new Subject();
    this.minimapBrushEnd$ = new Subject();
    this.displayedTime$ = merge(
      this.displayedTime.asObservable(),
      this.brushMove$,
      this.minimapBrushMove$
    );
  }

  changeTimeBound(timeBound): void {
    this.chartTimeWidth = timeBound;
    this.timeBoundChanged.emit(timeBound);
    this.started.emit();
  }

  ngOnInit(): void {
    this.canvasWidth = this.calculateCanvasWidth();
    this.mainMapWidth = this.canvasWidth - 120;
  }

  showZoomOut(): boolean {
    return true;
  }

  zoomOut(): void {
    const [from, to] = this.timelineService.getMinimumAndMaximumTimestamps(
      this.fullLog
    );

    this.timeIntervalChanged.next({
      from,
      to,
    });
    this.started.next();
  }

  onMinimapBrushEnd({ from, to }: TimeInterval) {
    this.stopped.emit();
    this.timeIntervalChanged.next({
      from,
      to,
    });
  }
  onMinimapBrushMove(t: TimeInterval) {
    this.minimapBrushMove$.next(t);
  }

  getYLabelTranslate(index: number): string {
    return `translate(0, ${index * this.LINE_HEIGHT + 2})`;
  }

  private updateBrush() {
    const rowCount = Object.keys(this.currentLogData).length;
    const brush = d3
      .brushX()
      .extent([[0, 0], [this.canvasWidth - 120, this.LINE_HEIGHT * rowCount]]);

    d3.select(this.brush.nativeElement).call(brush);

    brush.on('brush', () => this.onBrushed());
    brush.on('end', () => this.onBrushEnd(brush));
  }

  private onBrushEnd(brush) {
    const evt = d3.event;
    if (!evt.selection) {
      return;
    }

    d3.select(this.brush.nativeElement).call(brush.move, null);

    this.stopped.next();
    this.timeIntervalChanged.next({
      from: this.scale.invert(evt.selection[0]).getTime(),
      to: this.scale.invert(evt.selection[1]).getTime(),
    });
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
    this.updateSublines();
    this.cdr.detectChanges();
  }

  private updateSublines() {
    this.xSublines = this.scale.ticks(10).map(this.scale);
    this.ySublines = this.labels
      .slice(0, this.labels.length - 1)
      .map((el, i) => {
        return this.LINE_HEIGHT * (i + 1);
      });
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
      const { from, to } = this.timeInterval;
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
      .attr('transform', (d, idx) => `translate(0, ${idx * this.LINE_HEIGHT})`)
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
          .call(d => self.drawRect(d));
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
      .attr('height', this.LINE_HEIGHT)
      .attr('x', d => this.scale(new Date(d.from)))
      .attr(
        'width',
        d => 16
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
