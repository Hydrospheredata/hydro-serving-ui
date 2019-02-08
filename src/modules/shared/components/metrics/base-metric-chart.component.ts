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

import { IChartData } from '@shared/models/application-chart.model';

import { Subscription, Subject, Observable, merge, interval } from 'rxjs';
import {
    switchMap,
    tap
} from 'rxjs/operators';

import { InfluxDBService } from '@core/services';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { IMetricSpecificationProvider } from '@shared/models/metric-specification.model';

interface IMetricData {
    name: string;
    value: number;
    labels: any;
    timestamp: number;
    health: any;
}

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
    set metricSpecificationProvider({id, metrics, kind, config }: IMetricSpecificationProvider) {
        this.metrics = metrics;
        this.metricSpecId = id;
        this.metricSpecKind = kind;
        this.threshold = config.threshold;
    }

    @Input()
    protected chartTimeWidth: number = 0;

    @Input()
    protected modelVersionId;

    protected metrics: string[] = [];
    protected metricSpecId: string;
    protected metricSpecKind: string;
    protected REQUEST_DELAY_MS: number = 1500;
    protected updateChartObservable$: Observable<any>;
    protected timeSubject: Subject<any> = new Subject<any>();

    @Output()
    private delete: EventEmitter<any> = new EventEmitter();

    @ViewChild('chartContainer')
    private chartContainerRef: ElementRef;

    // chart
    private chart: Highcharts.ChartObject;
    private chartBands: { [metricName: string]: string[] } = {};
    private plotBands: { [metricName: string]: Array<{from: number, to: number}> } = {};
    private series: { [metricName: string]: {name: string; data: Array<[number, number]>}} = {};
    private dataLength: number = 0;
    // common data
    private metricsData: IMetricData[] = [];
    private threshold: any = {};
    private updateChartSub: Subscription;

    constructor(
        public metricsService: MetricsService,
        public influxdbService: InfluxDBService
    ) {

        this.updateChartObservable$ = merge(
            interval(this.REQUEST_DELAY_MS),
            this.timeSubject.asObservable()
        );
    }

    ngOnInit(): void {
        this.initChart();
        this.selfUpdate();
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
        this.delete.emit(this.metricSpecId);
    }

    protected getRequestPromise(): Promise<any> {
        return this.metricsService.getMetrics(
            this.modelVersionId.toString(),
            this.chartTimeWidth.toString(),
            this.metrics,
            ''
        );
    }

    private initChart(): void {
        HighchartsNoDataToDisplay(Highcharts);
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
                    text: this.metrics.join(','),
                },
                plotLines: this.threshold !== undefined ? [{
                    color: 'red',
                    dashStyle: 'longdashdot',
                    value: parseFloat(this.threshold),
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
        return this.metricSpecKind;
    }

    private drawSeries(): void {
        const chartSeries = this.chart.series;

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

        chartBandsEntries.forEach(([_, ids]) =>
            ids.forEach(id => this.chart.xAxis[0].removePlotBand(id))
        );

        if (plotBandsEntries.length > 0 ) {
            plotBandsEntries.forEach(([metricName, plotBandList]) => {
                plotBandList.forEach(({from, to}) => {
                    const id = `${from}_${to}`;
                    this.chartBands[metricName].push(id);
                    this.chart.xAxis[0].addPlotBand({
                        from: from * 1000,
                        to: to * 1000,
                        color: 'rgba(176, 0, 32, 0.2)',
                        id,
                    });
                });
            });
        }
    }

    private drawThreshold(): void {
        const currentThresholdSeries = this.chart.series.find(_ => _.name === `${name}_threshold`);

        if (this.threshold && this.metricsData.length > 0) {
            if (currentThresholdSeries) {
                currentThresholdSeries.update({ name: `${name}_threshold`, data: [this.threshold] }, true);
            } else {
                this.chart.addSeries({
                    name: `${name}_threshold`,
                    data: [[new Date().getTime(), this.threshold]],
                    type: 'scatter',
                    showInLegend: false,
                    marker: { enabled: false },
                    enableMouseTracking: false,
                }, true);
            }
        } else {
            if (currentThresholdSeries) {
                currentThresholdSeries.remove();
            }
        }
    }

    private fetchMetricsData(): void {
        if (this.metricsData.length === 0) {
            return;
        }

        const newSeries: { [metricName: string]: {name: string; data: Array<[number, number]>}} = {};
        const newPlotBands: {[metricName: string]: Array<{from: number, to: number}>} = {};

        let tmpBandObject = null;

        for (let i = 0, l = this.metricsData.length, isLastElement = i === l - 1; i < l; i++) {
            const currentMetricData = this.metricsData[i];
            const { name, timestamp, value, health } = currentMetricData;

            // series
            if (newSeries[name] === undefined ) {
               newSeries[name] = { name, data: [] };
            }

            newSeries[name].data.push([timestamp * 1000, value]);

            // plotBands
            if (newPlotBands[name] === undefined ) {
                newPlotBands[name] = [];
            }

            if (tmpBandObject) {
                if (health === 0) {
                    tmpBandObject.to = timestamp;
                 }
                if (health === 1 || isLastElement) {
                    newPlotBands[name].push(Object.assign({}, tmpBandObject));
                    tmpBandObject = null;
                }
            } else {
                if (health === 1) { continue; }
                if (health === 0) {
                    tmpBandObject = { from: timestamp, to: timestamp };
                }

            }
        }

        this.series = newSeries;
        this.plotBands = newPlotBands;
    }

    private selfUpdate() {
        this.updateChartSub = this.updateChartObservable$.pipe(
            switchMap(_ => this.getMetricsData()),
            tap(_ => this.redrawChart())
        ).subscribe();
    }

    private redrawChart() {
        this.fetchMetricsData();
        this.drawSeries();
        this.drawThreshold();
        this.drawBands();
    }

    private getMetricsData(): Promise<any> {
        return this.getRequestPromise().then(result => {
            this.metricsData = result;
        });
    }
}
