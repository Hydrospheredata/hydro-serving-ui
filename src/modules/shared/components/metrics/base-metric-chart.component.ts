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
    ChangeDetectionStrategy,
    OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import * as moment from 'moment';

import { IChartData, IMetricData, IMetricDataRow } from '@shared/models/application-chart.model';

import { Subscription, Subject, Observable, merge } from 'rxjs';
import {
    switchMap,
    tap
} from 'rxjs/operators';

import { InfluxDBService } from '@core/services';
import { MetricsService } from '@core/services/metrics/metrics.service';

@Component({
    selector: 'hydro-base-metric-chart',
    templateUrl: './base-metric-chart.component.html',
    styleUrls: ['./base-metric-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseMetricChartComponent implements OnInit, OnChanges, OnDestroy {
    protected metrics: string[] = [];
    protected REQUEST_DELAY_MS: number = 1500;
    protected updateChartObservable$: Observable<any>;
    protected timeSubject: Subject<any> = new Subject<any>();

    @Input()
    protected applicationId: number;

    @Input()
    protected stage: any;

    @Input()
    protected chartTimeWidth: number = 0;

    @Input()
    protected stageId;

    @Input()
    private chartData: IChartData;

    @Output()
    private delete: EventEmitter<any> = new EventEmitter();

    @ViewChild('chartContainer')
    private chartContainerRef: ElementRef;

    // chart
    private chart: Highcharts.ChartObject;
    private chartBands: { [s: string]: string[] } = {};
    private healthBounds: { [s: string]: Date[]} = {};
    private series: { [s: string]: {name: string; data: Array<[number, number]>}} = {};
    private dataLength: number = 0;
    // common data
    private metricData: any = {};
    private metricsData: any = [];
    private threshold: any = {};
    private updateChartSub: Subscription;

    constructor(
        public metricsService: MetricsService,
        public influxdbService: InfluxDBService
    ) {
        this.updateChartObservable$ = merge(
            Observable.interval(this.REQUEST_DELAY_MS),
            this.timeSubject.asObservable()
        );
    }

    ngOnInit(): void {
        this.initThreshold(this.chartData.metricProvider);
        this.initChart();
        this.selfUpdate();

        this.metrics = this.chartData.metricProvider.metrics || [];
    }

    ngOnDestroy(): void {
        this.updateChartSub.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.chartTimeWidth && !changes.chartTimeWidth.firstChange) {
            this.timeSubject.next();
        }
    }

    public onDelete(): void {
        this.delete.emit(this.chartData.metricProvider.id);
    }

    protected filterFunction(_): boolean {
        return _.columnIndex == null;
    }

    protected getRequestPromise(): Promise<any> {
        return this.metricsService.getMetrics(
            this.applicationId.toString(),
            this.stageId,
            this.chartTimeWidth.toString(),
            this.metrics,
            ''
        );
    }

    private initThreshold(metricProvider): void {
        if (metricProvider.healthConfig && metricProvider.healthConfig.hasOwnProperty('threshold')) {
            this.threshold = parseFloat(metricProvider.healthConfig.threshold);
        } else {
            if (this.threshold) {
                this.threshold = null;
            }
        }
    }

    private initChart(): void {
        HighchartsNoDataToDisplay(Highcharts);
        const metricProvider = this.chartData.metricProvider as any;
        this.chart = Highcharts.chart(this.chartContainerRef.nativeElement, {
            credits: {
                enabled: false,
            },
            chart: {
                type: 'spline',
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
                    text: metricProvider.metrics.join(','),
                },
                plotLines: metricProvider.withHealth && metricProvider.healthConfig.hasOwnProperty('threshold') ? [{
                    color: 'red',
                    dashStyle: 'longdashdot',
                    value: parseFloat(metricProvider.healthConfig.threshold),
                    width: 2,
                }] : [],
            },
            tooltip: {
                shared: true,
            },
            plotOptions: {
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
        return this.chartData.metricProvider.name;
    }

    private drawSeries(): void {
        this.dataLength = 0;

        if (this.series) {
            for (const seriesName in this.series) {
                if (this.series.hasOwnProperty(seriesName)) {
                    if (!this.series.hasOwnProperty(seriesName)) { return; }

                    const series = this.series[seriesName];
                    const currentSeries = this.chart.series.find(chartSeries => chartSeries.name === series.name);

                    if (currentSeries) {
                        this.chart
                            .xAxis[0]
                            .setExtremes(
                                moment().subtract(this.chartTimeWidth / 60000, 'minutes').valueOf(),
                                moment().valueOf(),
                                false
                            );
                        currentSeries.update(series, true);
                    } else {
                        this.chart.addSeries(series, true);
                    }
                    this.dataLength += series.data.length;
                }
            }
        }
    }

    private drawBands(): void {
        this.chartData.metricProvider.metrics.forEach(metricName => {
            if (!this.healthBounds[metricName]) { return; }

            if (!this.chartBands.hasOwnProperty(metricName)) {
                this.chartBands[metricName] = [];
            }

            this.chartBands[metricName].forEach(_ => this.chart.xAxis[0].removePlotBand(_));

            for (let i = 0; i < this.healthBounds[metricName].length; i += 2) {
                if (i < this.healthBounds[metricName].length && i + 1 < this.healthBounds[metricName].length) {
                    const curMetricName = this.healthBounds[metricName];
                    const id = `${curMetricName[i].getTime()}_${curMetricName[i + 1].getTime()}`;
                    this.chartBands[metricName].push(id);
                    this.chart.xAxis[0].addPlotBand({
                        from: this.healthBounds[metricName][i].getTime(),
                        to: this.healthBounds[metricName][i + 1].getTime(),
                        color: 'rgba(176, 0, 32, 0.2)',
                        id,
                    });
                }
            }
        });
    }

    private drawThreshold(): void {
        const threshold = this.threshold;
        const currentThresholdSeries = this.chart.series.find(_ => _.name === `${name}_threshold`);

        if (this.dataLength !== 0) {
            if (currentThresholdSeries) {
                currentThresholdSeries.update({ name: `${name}_threshold`, data: [threshold] }, true);
            } else {
                this.chart.addSeries({
                    name: `${name}_threshold`,
                    data: [[new Date().getTime(), threshold]],
                    type: 'scatter',
                    showInLegend: false,
                    marker: { enabled: false },
                    enableMouseTracking: false,
                }, true);
            }
        } else {
            if (currentThresholdSeries) {
                currentThresholdSeries.remove(true);
            }
        }
    }

    private fetchChartData(): void {
        const getModelName = (modelId): string => {
            return this.stage.services.reduce((modelNames, service) => {
                if (service.modelVersion.id === ~~modelId) {
                    return modelNames.push(service.modelVersion.modelName);
                } else {
                    return modelNames;
                }
            }, [])[0];
        };

        const metrics = this.metrics;
        const metricsData = this.metricsData;

        metrics.forEach(metricName => {
            const groupedByModelVersionId: { [s: string]: any[] } = {};
            const metricData: IMetricData = metricsData.find(item => item.name === metricName);

            if (metricData) {
                const rows: IMetricDataRow[] = metricData.rows;
                rows.filter(row => this.filterFunction(row)).forEach(_ => {
                    if (!groupedByModelVersionId.hasOwnProperty(_.modelVersionId)) {
                        groupedByModelVersionId[_.modelVersionId] = [];
                    }
                    groupedByModelVersionId[_.modelVersionId].push([_.time.getTime(), _.value]);
                });

                if (!this.healthBounds.hasOwnProperty[metricName]) {
                    this.healthBounds[metricName] = [];
                }

                rows.forEach((currentRow, i) => {
                    const currentHealth = currentRow.health;
                    if (currentHealth === 0) {
                        if (~~i === 0 || rows[~~i - 1].health === 1 || ~~i === rows.length - 1) {
                            this.healthBounds[metricName].push(rows[i].time);
                        }
                    }

                    if (currentHealth === 1) {
                        if (~~i !== 0 && rows[~~i - 1].health === 0) {
                            this.healthBounds[metricName].push(rows[~~i - 1].time);
                        }
                    }
                });
            }

            for (const key in groupedByModelVersionId) {
                if (groupedByModelVersionId.hasOwnProperty(key)) {
                    const seriesName = `${getModelName(key)}_${metricName}`;
                    this.series[seriesName] = {
                        name: seriesName,
                        data: groupedByModelVersionId[key],
                    };
                }
            }
        });
    }

    private selfUpdate() {
        this.updateChartSub = this.updateChartObservable$.pipe(
            switchMap(_ => {
                return this.getMetrics();
            }),
            tap(_ => this.redrawChart())
        ).subscribe();
    }

    private redrawChart() {
        this.fetchChartData();
        this.drawSeries();
        this.drawThreshold();
        this.drawBands();
    }

    private getMetrics(): Promise<any> {
        return this.getRequestPromise().then(result => {
            const res = this.influxdbService.parse(result) as any;

            this.metrics.forEach(metric => {
                const groupRow = res.groupRows.find(_ => _.name === metric);
                if (!groupRow) { return; }

                this.metricData[metric] = groupRow;
            });

            this.metricsData = this.getMetricsData();
        });
    }

    private getMetricsData(): IMetricData[] {
        return this.metrics.reduce((metricsData, metricName) => {
            if (this.metricData[metricName]) {
                return metricsData.concat(this.metricData[metricName]);
            } else {
                return metricsData;
            }
        }, []);
    }
}
