import { Component, OnInit,Output,EventEmitter, Input, ElementRef, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import * as moment from 'moment';

import { IChartData, IMetricData, IMetricDataRow } from '@shared/models/application-chart.model'

import { interval } from 'rxjs/observable/interval';
import {
    switchMap,
    tap
} from 'rxjs/operators';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { InfluxDBService } from '@core/services';
import { Subscription, Subject, Observable } from 'rxjs';
import { merge } from 'rxjs/observable/merge';


@Component({
    selector: 'hydro-base-metric-chart',
    templateUrl: './base-metric-chart.component.html',
    styleUrls: ['./base-metric-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseMetricChartComponent implements OnInit, OnChanges, OnDestroy {
    @Input() chartData: IChartData;
    @Input() chartTimeWidth: number;
    @Input() stage;
    @Input() applicationId;
    @Input() stageId;

    @Output() delete: EventEmitter<any> = new EventEmitter();

    @ViewChild('chartContainer') chartContainerRef: ElementRef;

    //chart
    private chart: Highcharts.ChartObject;
    private chartBands: { [s: string]: string[] } = {};
    private healthBounds: { [s: string]: Date[]} = {};
    private series: { [s: string]: {name: string; data: Array<[number, number]>}} = {};
    private dataLength: number = 0;
    //common data
    private metricData: any = {};
    private metricsData: any = [];
    private threshold : any = {};
    protected  metrics;

    protected REQUEST_DELAY_MS = 1500;

    protected updateChartObservable$: Observable<any>;
    private updateChartSub: Subscription;
    protected timeSubject: Subject<any> = new Subject<any>();

    constructor(
        public metricsService: MetricsService,
        public influxdbService: InfluxDBService
    ) { 
        this.updateChartObservable$ = merge(
            interval(this.REQUEST_DELAY_MS), 
            this.timeSubject.asObservable()
        );
    }

    ngOnDestroy(){
        this.updateChartSub.unsubscribe()
    }
    ngOnInit(): void {
        this.initThreshold(this.chartData.metricProvider);
        this.initChart();
        this.selfUpdate();

        this.metrics = this.chartData.metricProvider.metrics || [];
    }

    private initThreshold(metricProvider){
        if (metricProvider.healthConfig && metricProvider.healthConfig.hasOwnProperty("threshold")) {
            this.threshold = parseFloat(metricProvider.healthConfig["threshold"]);
        } else {
            if (this.threshold) {
                this.threshold = null;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void{
        if(changes.chartTimeWidth && !changes.chartTimeWidth.firstChange){
            this.timeSubject.next();
        }
    }

    private initChart(): void{
        HighchartsNoDataToDisplay(Highcharts);
        const metricProvider = this.chartData.metricProvider;
        this.chart = Highcharts.chart(this.chartContainerRef.nativeElement, {
            credits: {
                enabled: false
            },
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            xAxis: {
                title: {
                    text: 'Time'
                },
                type: "datetime",
                gridLineWidth: 1,
                max: new Date().getTime(),
                min: moment().subtract(this.chartTimeWidth / 60000, "minutes").valueOf()
            },
            yAxis: {
                title: {
                    text: metricProvider.metrics.join(",")
                },
                plotLines: metricProvider.withHealth && metricProvider.healthConfig.hasOwnProperty("threshold") ? [{
                    color: "red",
                    dashStyle: 'longdashdot',
                    value: parseFloat(metricProvider.healthConfig["threshold"]),
                    width: 2
                }] : []
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            lang: {
                noData: "Waiting for data..."
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#a0a0a0'
                }
            }
        });
    }

    get title(): string{
        return this.chartData.metricProvider.name;
    }

    public onDelete(): void{
        this.delete.emit(this.chartData.metricProvider.id);
    }

    private drawSeries(): void{
        this.dataLength = 0;

        if(this.series){
            for(let seriesName in this.series){
                if(!this.series.hasOwnProperty(seriesName)){ return };

                const series = this.series[seriesName];
                const currentSeries = this.chart.series.find(chartSeries => chartSeries.name == series.name);
                if (currentSeries) {
                    this.chart.xAxis[0].setExtremes(moment().subtract(this.chartTimeWidth / 60000, "minutes").valueOf(), moment().valueOf(), false);
                    currentSeries.update(series, true);
                } else {
                    this.chart.addSeries(series, true);
                }
                this.dataLength += series.data.length;
            }
        }
    }

    private drawBands(): void {
        this.chartData.metricProvider.metrics.forEach(metricName => {
            if (!this.healthBounds[metricName]) { return };
            if (!this.chartBands.hasOwnProperty(metricName)) {
                this.chartBands[metricName] = [];
            }
            this.chartBands[metricName].forEach(_ => this.chart.xAxis[0].removePlotBand(_));
            this.chartBands[metricName] = [];
            for (let i = 0; i < this.healthBounds[metricName].length; i += 2) {
                if (i < this.healthBounds[metricName].length && i + 1 < this.healthBounds[metricName].length) {
                    const id = `${this.healthBounds[metricName][i].getTime()}_${this.healthBounds[metricName][i + 1].getTime()}`;
                    this.chartBands[metricName].push(id);
                    this.chart.xAxis[0].addPlotBand({
                        from: this.healthBounds[metricName][i].getTime(),
                        to: this.healthBounds[metricName][i + 1].getTime(),
                        color: 'rgba(176, 0, 32, 0.2)',
                        id
                    })
                }
            }
        })
    }

    private drawThreshold(): void {
        const threshold = this.threshold;
        const currentThresholdSeries = this.chart.series.find(_ => _.name == `${name}_threshold`);
                
        if (this.dataLength != 0) {
            if (currentThresholdSeries) {
                currentThresholdSeries.update({ name: `${name}_threshold`, data: [threshold] }, true);
            } else {
                this.chart.addSeries({
                    name: `${name}_threshold`, 
                    data: [[new Date().getTime(), threshold]], 
                    type: 'scatter', 
                    showInLegend: false, 
                    marker: { enabled: false }, 
                    enableMouseTracking: false
                }, true);
            }
        } else {
            if (currentThresholdSeries) {
                currentThresholdSeries.remove(true);
            }
        }
    }

    private fetchChartData(): void{
        const getModelName = (modelId): string => {
            return this.stage.services.reduce((modelNames, service) => {
                if(service.modelVersion.id === ~~modelId){
                    return modelNames.push(service.modelVersion.modelName)
                }
            }, [])[0];
        }

        const metrics = this.metrics;
        const metricsData = this.metricsData;

        metrics.forEach(metricName => {
            const groupedByModelVersionId: { [s: string]: any[] } = {}; 
            const metricData: IMetricData = metricsData.find(item => item.name === metricName);

            if(metricData){
                const rows: Array<IMetricDataRow> = metricData.rows;
                rows.filter((row) => this.filterFunction(row)).forEach(_ => {
                    if (!groupedByModelVersionId.hasOwnProperty(_["modelVersionId"])) {
                        groupedByModelVersionId[_["modelVersionId"]] = [];
                    }
                    groupedByModelVersionId[_["modelVersionId"]].push([_["time"].getTime(), _["value"]]);
                });

                if (!this.healthBounds.hasOwnProperty[metricName]) {
                    this.healthBounds[metricName] = []
                }

                for (let i in rows) {
                    if (rows[i]["health"] === 0) {
                        if (~~i === 0 || rows[~~i - 1]["health"] === 1 || ~~i === rows.length - 1) {
                            this.healthBounds[metricName].push(rows[i]["time"]);
                        }
                    }
                    if (rows[i]["health"] === 1) {
                        if (~~i !== 0 && rows[~~i - 1]["health"] === 0) {
                            this.healthBounds[metricName].push(rows[~~i - 1]["time"]);
                        }
                    }
                }
            };

            for (let key in groupedByModelVersionId) {
                const seriesName = `${getModelName(key)}_${metricName}`;
                this.series[seriesName] = {
                    name: seriesName,
                    data: groupedByModelVersionId[key]
                }
            };
        });
    }

    public filterFunction(_){
        return _["columnIndex"] == null
    }

    private selfUpdate(){
        this.updateChartSub = this.updateChartObservable$.pipe(
            switchMap(_ => {
                return this.getMetrics()
            }),
            tap(_ => this.redrawChart())
        ).subscribe();
    }

    private redrawChart(){
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
            })

            this.metricsData = this.getMetricsData();
        });
    }

    public getRequestPromise(): Promise<any> {
        return this.metricsService.getMetrics(this.applicationId, this.stageId, this.chartTimeWidth, this.metrics, '')
    }

    private getMetricsData(): IMetricData[] {
        return this.metrics.reduce((metricsData, metricName) => {
            if(this.metricData[metricName]){
                return metricsData.concat(this.metricData[metricName]);
            } else {
                return metricsData;
            }
        }, []);
    }
}
