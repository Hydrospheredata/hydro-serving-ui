import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ElementRef,
    ViewChild,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    ChangeDetectionStrategy} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import * as moment from 'moment';

import { IChartData } from '@shared/models/application-chart.model';

import { Subscription, Subject, Observable, interval, combineLatest } from 'rxjs';
import {
    switchMap,
    tap,
    startWith,
    takeUntil,
    filter
} from 'rxjs/operators';

import { InfluxDBService } from '@core/services';
import { MonitoringService, IMetricData } from '@core/services/metrics/monitoring.service';
import { ITimeInterval } from '@shared/models/_index';
import { IMetricSpecificationProvider, IMetricSpecification } from '@shared/models/metric-specification.model';

@Component({
    selector: 'hs-base-metric-chart',
    templateUrl: './base-metric-chart.component.html',
    styleUrls: ['./base-metric-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseMetricChartComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    public chartData: IChartData;

    @Input()
    public metricSpecificationProvider: IMetricSpecificationProvider;

    public metricsByModelVersion: { [modelVersion: string]: string[] };
    public makeRequest: Subject<Array<Promise<IMetricData[]>>> = new Subject();
    public requests: Array<Promise<any>>;

    public from: IMetricData;
    public to: IMetricData;

    @Input()
    protected chartTimeWidth: number = 0;

    @Input()
    protected modelVersionId;

    protected metrics: string[] = [];
    protected metricSpecId: string;
    protected metricSpecKind: string;
    protected REQUEST_DELAY_MS: number = 1000;
    protected updateChartObservable$: Observable<any>;
    protected timeSubject: Subject<any> = new Subject<any>();
    protected providersSubject: Subject<any> = new Subject<any>();

    @Output()
    private selectPoints: EventEmitter<ITimeInterval> = new EventEmitter<ITimeInterval>();

    @ViewChild('chartContainer')
    private chartContainerRef: ElementRef;

    // chart
    private chart: Highcharts.ChartObject;
    private chartBands: { [metricName: string]: string[] } = {};
    private plotBands: { [metricName: string]: Array<{from: IMetricData, to: IMetricData}> } = {};
    private series: { [metricName: string]: {name: string; data: Array<{x: any, y: any, name: any}>}} = {};

    // common data
    private metricsData: IMetricData[] = [];
    private thresholds: {[uniqName: string]: number} = {};
    private updateChartSub: Subscription;

    // private selectSeriesPoint$: Subject<IMetricData> = new Subject();
    private onDestroy$: Subject<any>;

    constructor(
        public metricsService: MonitoringService,
        public influxdbService: InfluxDBService
    ) {
        this.onDestroy$ = new Subject();

        this.updateChartObservable$ = combineLatest(
            this.timeSubject.asObservable(),
            this.providersSubject.asObservable(),
            interval(this.REQUEST_DELAY_MS).pipe(startWith('first tick'))
        );

        this.selfUpdate();
    }

    ngOnInit(): void {
        this.initChart();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next('');
        this.onDestroy$.complete();
        this.onDestroy$ = null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.chartTimeWidth) {
            this.timeSubject.next(changes.chartTimeWidth.currentValue);
        }

        if (changes.metricSpecificationProvider) {
            this.initThresholds();
            this.providersSubject.next(changes.metricSpecificationProvider.currentValue);
        }
    }

    public initThresholds() {
        const newThresholds = {};
        const data = Object.entries(this.metricSpecificationProvider.byModelVersionId);

        data.forEach(([modelVerId, metricSpec]: [string, IMetricSpecification]) => {
            const uniqName = `${modelVerId}_threshold`;
            if (newThresholds[uniqName] === undefined && metricSpec.config.threshold) {
                newThresholds[uniqName] = metricSpec.config.threshold;
            }
        });
        this.thresholds = newThresholds;
    }

    protected getRequestPromise(id, i, metrics): Promise<IMetricData[]> {
        return this.metricsService.getMetrics(
            id.toString(),
            i,
            metrics,
            ''
        );
    }

    private initChart(): void {
        const self = this;

        Highcharts.setOptions({
            time: {
               useUTC: false,
            },
        });

        HighchartsNoDataToDisplay(Highcharts);
        this.chart = Highcharts.chart(this.chartContainerRef.nativeElement, {
            credits: {
                enabled: false,
            },
            chart: {
                type: 'spline',
                animation: false,
                height: '300px',
                events: {
                    selection: event => {
                        if (event.xAxis && event.xAxis[0]) {
                            const from = Math.floor(event.xAxis[0].min / 1000);
                            const to = Math.ceil(event.xAxis[0].max / 1000);
                            self.selectPoints.emit({from, to});
                        }
                        return false;
                    },
                },
                zoomType: 'x',
            },
            title: {
                text: '',
            },
            xAxis: {
                title: {
                    text: 'Time',
                },
                type: 'datetime',
                gridLineWidth: 1,
                max: new Date().getTime(),
                min: moment().subtract(this.chartTimeWidth / 60000, 'minutes').valueOf(),
            },
            yAxis: {
                title: {
                    text: this.metrics.join(','),
                },
            },
            tooltip: {
                pointFormat: 'Date: {point.x:%e. %b} Value {point.y:.2f}',
            },
            plotOptions: {
                series: {
                    turboThreshold: 10000,
                    cursor: 'pointer',
                    point: {
                        events: {
                            select: () => true,
                        },
                    },
                },
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0,
                },
            },
            lang: {
                noData: 'Waiting for data...',
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#a0a0a0',
                },
            },
        });
    }

    get title(): string {
        const versions = Object.keys(this.metricSpecificationProvider.byModelVersionId);

        if (versions.length > 1) {
            return this.metricSpecificationProvider.kind;
        } else {
            return this.metricSpecificationProvider.byModelVersionId[versions[0]].name;
        }
    }

    private drawSeries(): void {
        const chartSeries = this.chart.series;
        const seriesNames = Object.keys(this.series);
        // clear series
        chartSeries.forEach(curChartSeries => {
            if (!seriesNames.includes(curChartSeries.name)) {
                curChartSeries.remove(true);
            }
        });

        Object.entries(this.series).forEach(([name, series]) => {
            const currentSeriesOnChart = chartSeries.find(_ => _.name === name);
            if (currentSeriesOnChart) {
                this.chart
                    .xAxis[0]
                    .setExtremes(
                        moment().subtract(this.chartTimeWidth / 60000, 'minutes').valueOf(),
                        moment().valueOf(),
                        false
                );
                currentSeriesOnChart.update(series, true);
            } else {
                this.chart.addSeries(series, true);
            }
        });
    }

    private drawBands(): void {
        const plotBandsEntries = Object.entries(this.plotBands);
        const chartBandsEntries = Object.entries(this.chartBands);
        const self = this;

        chartBandsEntries.forEach(([_, ids]) =>
            ids.forEach(id => this.chart.xAxis[0].removePlotBand(id))
        );

        if (plotBandsEntries.length > 0 ) {
            plotBandsEntries.forEach(([metricName, plotBandList]) => {
                plotBandList.forEach(({from, to}) => {
                    if (this.chartBands[metricName] === undefined) {
                        this.chartBands[metricName] = [];
                    }
                    const id = `${from.timestamp}_${to.timestamp}`;
                    this.chartBands[metricName].push(id);
                    this.chart.xAxis[0].addPlotBand({
                        from: from.timestamp * 1000,
                        to: to.timestamp * 1000,
                        color: 'rgba(176, 0, 32, 0.2)',
                        id,
                        events: {
                            click(e) {
                                self.selectPoints.emit({from: from.timestamp, to: to.timestamp});
                            },
                        },
                    });
                });
            });
        }
    }

    private drawThresholds(): void {
        const thresholds = Object.entries(this.thresholds);
        const thresholdsNames = Object.keys(this.thresholds);
        const isThreshold = ({name}: Highcharts.SeriesObject): boolean => /^.+_threshold$/.test(name);
        const currentChartThresholdSeries = this.chart.series.filter(isThreshold);

        if (thresholds.length && currentChartThresholdSeries.length) {
            currentChartThresholdSeries.forEach(series => series.remove(true));
            } else {
            // TODO: лишняя проверка можно оптимизнуть
            // все перенести в стримы
            currentChartThresholdSeries.forEach(series => {
                if (!thresholdsNames.includes(series.name)) {
                    series.remove(true);
                }
            });

            thresholds.forEach(([thresholdName, value]) => {
                const thresholdAreadyDraw = currentChartThresholdSeries.find(({name}) => name === thresholdName);
                if (!thresholdAreadyDraw) {
                    this.chart.yAxis[0].addPlotLine({
                        color: 'red',
                        dashStyle: 'scatter',
                        value,
                        width: 2,
                    });
                }
            });
        }
    }

    private fetchMetricsData(): void {
        if (this.metricsData.length === 0) {
            return;
        }

        const newSeries: {
            [metricName: string]: {
                name: string;
                data: Array<{
                    x: any,
                    y: any,
                    name: any,
                    key: IMetricData}>
            }} = {};
        const newPlotBands: {[metricName: string]: Array<{from: IMetricData, to: IMetricData}>} = {};

        let tmpBandObject = null;

        const metricsCount = this.metricSpecificationProvider.metrics.length;
        /* Different metrics, like ['ks', 'ks_level'], have same 'health' value */
        const plotGenerateStop = (this.metricsData.length / metricsCount) - 1;

        for (let i = 0, l = this.metricsData.length; i < l; i++) {
            const isLastElement = i === plotGenerateStop;
            const currentMetricData = this.metricsData[i];
            const { name, timestamp, value, health, labels } = currentMetricData;

            const uniqName = `${name}_version_${labels.modelVersionId}`;

            // series
            if (newSeries[uniqName] === undefined ) {
               newSeries[uniqName] = { name: uniqName, data: [] };
            }

            newSeries[uniqName].data.push({
                x: timestamp * 1000,
                y: value,
                name: timestamp,
                key: currentMetricData,
            });

            // plotBands
            if ( i > plotGenerateStop) { continue; }
            if (newPlotBands[uniqName] === undefined ) {
                newPlotBands[uniqName] = [];
            }

            if (tmpBandObject) {
                if (health === false) {
                    tmpBandObject.to = currentMetricData;
                 }
                if (health === true || isLastElement) {
                    newPlotBands[uniqName].push(Object.assign({}, tmpBandObject));
                    tmpBandObject = null;
                }
            } else {
                if (health === true) { continue; }
                if (health === false) {
                    tmpBandObject = { from: currentMetricData, to: currentMetricData };
                }
            }
        }

        this.series = newSeries;
        this.plotBands = newPlotBands;
    }

    private selfUpdate() {
        let loading = false;
        this.updateChartSub = this.updateChartObservable$.pipe(
            filter(() => !loading),
            switchMap(([time, providers]) => {
                const {
                    byModelVersionId,
                    metrics,
                }: IMetricSpecificationProvider = providers;
                const requests = [];

                Object.values(byModelVersionId).forEach(metricSpecification => {
                    requests.push(this.getRequestPromise(metricSpecification.modelVersionId, time, metrics));
                });

                loading = true;
                return combineLatest(...requests);
            }),
            tap(([primaryMetricData, comparedMetricData]: [IMetricData[], IMetricData[]]) => {
                this.metricsData = primaryMetricData.concat(comparedMetricData || []);
                loading = false;
            }),
            tap(_ => this.redrawChart()),
            takeUntil(this.onDestroy$)
        ).subscribe();
    }

    private redrawChart() {
        this.fetchMetricsData();
        this.drawSeries();
        this.drawThresholds();
        this.drawBands();
    }
}
