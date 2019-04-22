import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
    ChangeDetectorRef,
    ViewEncapsulation,
    Output,
    EventEmitter
} from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { HealthTimelineHistoryService } from '@core/services/health-timeline-history.service';
import { HealthTimelineService } from '@core/services/health-timeline.service';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ITimeInterval, IModelVersion, IModel } from '@shared/models/_index';
import { IMetricSpecification } from '@shared/models/metric-specification.model';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import * as d3 from 'd3';
import { request } from 'http';
import { Subscription, Subject, merge, Observable, TimeInterval, pipe, combineLatest, of, BehaviorSubject } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'hs-health-timeline',
    templateUrl: './health-timeline.component.html',
    styleUrls: ['./health-timeline.component.scss'],
    providers: [HealthTimelineService, HealthTimelineHistoryService],
    encapsulation: ViewEncapsulation.None,
})
export class HealthTimelineComponent implements OnInit, OnDestroy {

    @ViewChild('svgContainer', { read: ElementRef })
    svgContainer: ElementRef;

    @ViewChild('yTitleContainer', { read: ElementRef })
    yTitleContainer: ElementRef;

    @ViewChild('dataContainer', { read: ElementRef })
    dataContainer: ElementRef;

    @ViewChild('brush', { read: ElementRef })
    brush: ElementRef;

    currentTimeInterval: ITimeInterval;

    canvasHeight: number;
    canvasWidth: number = 960;

    xAxisTransform = 'translate(0,0)';
    mimimapTransform = 'translate(0,0)';
    minimapWidth = 840;

    fullLog: any;

    brushMove$: Subject<ITimeInterval>;
    minimapBrushMove$: Subject<ITimeInterval>;

    brushEnd$: Subject<ITimeInterval>;
    minimapBrushEnd$: Subject<ITimeInterval>;

    displayedTime: BehaviorSubject<ITimeInterval> = new BehaviorSubject(null);
    displayedTime$: Observable<ITimeInterval>;
    selectedTime$: Observable<ITimeInterval>;
    data$: Observable<ITimelineLog>;

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

    try: number;
    scale;

    modelVersion$: Observable<IModelVersion>;
    modelVersion: IModelVersion;
    metricSpecs: IMetricSpecification[];
    metrics$: Observable<IMetricSpecification[]>;

    @Output()
    private timeInterval: EventEmitter<ITimeInterval> = new EventEmitter();

    private currentLogData: ITimelineLog;
    private healthTimelineDataSub: Subscription;
    constructor(
        private timelineService: HealthTimelineService,
        private cd: ChangeDetectorRef,
        private metricSettingsService: MetricSettingsService,
        private monitoringService: MonitoringService,
        private store: Store<HydroServingState>
    ) {
        this.brushEnd$ = new Subject();
        this.brushMove$ = new Subject();
        this.minimapBrushMove$ = new Subject();
        this.minimapBrushEnd$ = new Subject();
        this.displayedTime$ = merge(this.displayedTime.asObservable(), this.brushMove$, this.minimapBrushMove$);
        this.selectedTime$ = merge(
            this.brushEnd$,
            this.minimapBrushEnd$
        ).pipe(startWith());
        this.modelVersion$ = this.store.select(getSelectedModelVersion);
    }

    ngOnInit(): void {
        this.metrics$ = combineLatest(this.modelVersion$).pipe(
            switchMap(([modelVersion]) => this.metricSettingsService.getMetricSettings(`${modelVersion.id}`))
        );

        combineLatest(this.metrics$, this.modelVersion$).pipe(
            switchMap(([metricSpecs, mv]) => {
                this.metricSpecs = metricSpecs;
                this.modelVersion = mv;
                return this.createInitRequests();
            }),
            tap(res => {
                const m = this.metricSpecs;
                const m2 = this.metricSpecs.reduce((acc, cur, idx) => {
                    acc[m[idx].name] = res[idx];
                    return acc;
                }, {});
                if (this.fullLog === undefined) {this.fullLog = m2; }
                this.currentLogData = m2;

                const interval = this.timelineService.getMinimumAndMaximumTimestamps(this.currentLogData);
                const i = { from: interval[0], to: interval[1]};
                this.displayedTime.next(i);
                this.timeInterval.next(i);
                this.render();
            })
        ).subscribe();

        combineLatest(this.selectedTime$, this.metrics$, this.modelVersion$).pipe(
            tap( ([timeInterval, metricSpecs, mv]) => {
                this.displayedTime.next(timeInterval);
                this.timeInterval.next(timeInterval);
            }),
            switchMap(([timeInterval, metricSpecs, mv]) => {
                this.metricSpecs = metricSpecs;
                this.modelVersion = mv;
                return this.createRequestsByInterval(timeInterval);
            }),
            tap(res => {
                const m = this.metricSpecs;
                const m2 = this.metricSpecs.reduce((acc, cur, idx) => {
                    acc[m[idx].name] = res[idx];
                    return acc;
                }, {});
                this.currentLogData = m2;
                this.render();
            })
        ).subscribe();
    }

    showZoomOut(): boolean {
        return this.timelineService.historyExist();
    }

    zoomOut(): void {
        this.timelineService.getPrevLog();
    }

    ngOnDestroy(): void {
        // this.healthTimelineDataSub.unsubscribe();
    }

    onMinimapBrushEnd(t: ITimeInterval) {
        this.minimapBrushEnd$.next(t);
    }
    onMinimapBrushMove(t: ITimeInterval) {
        this.minimapBrushMove$.next(t);
    }

    private createInitRequests() {
        const requests = this.metricSpecs
            .map(mS =>
                this.monitoringService.getAggregation(
                    `${this.modelVersion.id}`,
                    this.monitoringService.getMetricsBySpecKind(mS.kind)
                ));

        return combineLatest(...requests);
    }

    private createRequestsByInterval(timeInterval: ITimeInterval) {
        const requests = this.metricSpecs
            .map(mS =>
                this.monitoringService.getAggregation(
                    `${this.modelVersion.id}`,
                    this.monitoringService.getMetricsBySpecKind(mS.kind),
                    {
                        from: `${Math.floor(timeInterval.from / 1000)}`,
                        till: `${Math.floor(timeInterval.to / 1000)}`,
                    }
                ));

        return combineLatest(...requests);
    }

    private updateBrush() {
        const self = this;
        const rowCount = Object.keys(this.currentLogData).length;
        const brush = d3.brushX().extent([[0, 0], [840, 32 * rowCount]]);

        d3.select(this.brush.nativeElement).attr('transform', 'translate(0, 20)').call(brush);

        brush.on('end', () => {
            const evt = d3.event;
            if (!evt.selection) { return; }

            this.brushEnd$.next({
                from: this.scale.invert(evt.selection[0]).getTime(),
                to: this.scale.invert(evt.selection[1]).getTime(),
            });
            d3.select(this.brush.nativeElement).call(brush.move, null);
        });

        brush.on('brush', () => {
            const evt = d3.event;
            if (!evt.selection) { return; }

            this.brushMove$.next({
                from: this.scale.invert(evt.selection[0]).getTime(),
                to: this.scale.invert(evt.selection[1]).getTime(),
            });
        });
    }

    private elementsPositioning() {
        const rowCount = Object.keys(this.currentLogData).length;
        d3.select(this.dataContainer.nativeElement)
            .attr('transform', `translate(0, ${this.MARGIN.top})`);

        this.xAxisTransform = `translate(0, ${this.MARGIN.top + (rowCount * this.LINE_HEIGHT)})`;
        this.mimimapTransform =
            `translate(0, ${this.MARGIN.top + (rowCount * this.LINE_HEIGHT) + 40})`;
    }

    private render(): void {
        this.elementsPositioning();
        this.updateScale();
        this.updateCanvasSize();
        this.updateYTitle();
        this.updateDataset();
        this.updateBrush();
    }

    private updateScale() {
        if(this.logDataNotEmpty()){
            this.scale = d3.scaleTime()
            .domain(this.timelineService.getMinimumAndMaximumTimestamps(this.currentLogData))
            .range([0, 840]);
        } else {
            const {from, to} = this.displayedTime.getValue();

            this.scale = d3.scaleTime()
            .domain([new Date(from), new Date(to)])
            .range([0, 840]);
        }

    }

    private updateYTitle(): void {
        const yLabels = Object.keys(this.currentLogData);

        d3.select(this.yTitleContainer.nativeElement)
          .selectAll('text')
          .data(yLabels).join(
              enter => enter.append('text').attr('class', 'y-title').attr('y', 24)
          ).attr('transform', (_, j) => `translate(0, ${j * this.LINE_HEIGHT + 10})`)
           .text(d => d);
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
            ).attr('transform', (d, idx) => `translate(0, ${idx * 32})`)
             .each( function(data, index) {
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
                    ).call(_ => self.drawRect(_));
            });
    }

    private drawRect(selection) {
        selection
            .filter( d => d.meanValue !== null)
            .classed('dataset-m__rect--s',  d => d.meanHealth === 1)
            .classed('dataset-m__rect--f', d => d.meanHealth < 1)
            .attr('height', 14)
            .attr('x', d => this.scale(new Date(d.from * 1000)))
            .attr('width', d => this.scale(new Date(d.till * 1000)) - this.scale(new Date(d.from * 1000)));
    }

    private updateCanvasSize(): void {
        this.canvasHeight = this.calculateCanvasHeight();
    }
    private calculateCanvasHeight(): number {
        const rowCount = Object.keys(this.currentLogData).length;
        return this.MARGIN.top + (rowCount * this.LINE_HEIGHT) + this.X_AXIS_HEIGHT + this.MARGIN.bottom;
    }

    private rescaleMain(from, to) {
        this.scale = d3.scaleTime().domain([from, to]).range([0, 840]);
        this.updateDataset();
    }

    private logDataNotEmpty(){
        const data = Object.values(this.currentLogData);

        return data.some(el => el.length > 0);
    }
}
