import { Component, OnInit,Output,EventEmitter, Input, ElementRef, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import * as moment from 'moment';

import { IChartData, IMetricData, IMetricDataRow } from '@applications/app-interfaces'

@Component({
    selector: 'hydro-application-chart',
    templateUrl: './application-chart.component.html',
    styleUrls: ['./application-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationChartComponent implements OnInit, OnChanges {
    @Input() chartData: IChartData;
    @Input() chartTimeWidth: number;
    @Input() stage;

    @Output() delete: EventEmitter<any> = new EventEmitter();

    @ViewChild('chartContainer') chartContainerRef: ElementRef;

    public featureList: string[] = []
    public selectedFeature: string = '0';
    public showFeatureFilter: boolean = false;

    private chart: Highcharts.ChartObject;
    private chartBands: { [s: string]: string[] } = {};
    private healthBounds: { [s: string]: Date[]} = {};
    private series: { [s: string]: {name: string; data: Array<[number, number]>}} = {};

    private dataLength: number = 0;

    constructor() { }

    ngOnInit(): void {
        if(this.isMetricProviderWithFilter()){
            this.showFeatureFilter = true;
            this.featureList = this.getFeatureList();
        }

        this.initChart();
    }

    ngOnChanges(changes: SimpleChanges): void{
        if(!this.chart) { return };
        const chartData = (changes.chartData && changes.chartData.currentValue) || this.chartData;

        this.fetchChartData(chartData);

        this.drawSeries();
        this.drawThreshold(chartData.threshold);
        this.drawBands();
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

    private drawThreshold(threshold: number): void {
        const currentThresholdSeries = this.chart.series.find(_ => _.name == `${name}_threshold`);
                
        if (this.dataLength != 0) {
            if (currentThresholdSeries) {
                currentThresholdSeries.update({ name: `${name}_threshold`, data: [threshold] }, true);
            } else {
                this.chart.addSeries({ name: `${name}_threshold`, data: [[new Date().getTime(), threshold]], type: 'scatter', showInLegend: false, marker: { enabled: false }, enableMouseTracking: false }, true);
            }
        } else {
            if (currentThresholdSeries) {
                currentThresholdSeries.remove(true);
            }
        }
    }

    private fetchChartData(chartData): void{
        const getModelName = (modelId): string => {
            return this.stage.services.filter(_ => _.modelVersion.id === ~~modelId).map(_ => _.modelVersion.modelName)[0];
        }

        const metrics = chartData.metricProvider.metrics;
        const metricsData = chartData.metricsData;

        metrics.forEach(metricName => {
            const groupedByModelVersionId: { [s: string]: any[] } = {}; 
            const metricData: IMetricData = metricsData.find(item => item.name === metricName);

            if(metricData){
                const rows: Array<IMetricDataRow> = metricData.rows;
                rows.filter(_ => _["columnIndex"] == null || _["columnIndex"] == this.selectedFeature).forEach(_ => {
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

    private isMetricProviderWithFilter(): boolean{
        return this.chartData.metricProvider.metricProviderClass === "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov"
    }

    private getFeatureList(): string[]{
        switch(this.chartData.metricProvider.metricProviderClass){
            case "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov":
                return this.getKolmogorovSmirnovFeatures();
            default:
                return [];    
        }
    }

    private getKolmogorovSmirnovFeatures(): string[]{
        let features:string[] = [];
        for(let i = 0; i < 112;i++){
            features.push(`${i}`);
        };
        return features;
    }
}
