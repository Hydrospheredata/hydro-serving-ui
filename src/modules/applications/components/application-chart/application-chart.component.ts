import { Component, OnInit,Output,EventEmitter, Input, ElementRef, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import * as moment from 'moment';

interface IChartData {
    name: string;
    metricProvider: any;
    series: any;
}

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

    series = [];
    healthBounds = {};

    @Output() delete: EventEmitter<any> = new EventEmitter();

    @ViewChild('chartContainer') chartContainerRef: ElementRef;

    public chart: Highcharts.ChartObject;

    constructor() { }

    ngOnInit(): void {
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

    ngOnChanges(changes: SimpleChanges){
        if(!this.chart) { return };
        let dataLength: number = 0;
        let healthBounds = this.healthBounds;
        let chartBands = changes.chartData.currentValue.chartBands || {};

        this.chartData.metricProvider.metrics.forEach(metric => {
            if (!healthBounds[metric]) { return };
            if (!chartBands.hasOwnProperty(metric)) {
                chartBands[metric] = [];
            }
            chartBands[metric].forEach(_ => this.chart.xAxis[0].removePlotBand(_));
            chartBands[metric] = [];
            for (let i = 0; i < healthBounds[metric].length; i += 2) {
                if (i < healthBounds[metric].length && i + 1 < healthBounds[metric].length) {
                    const id = `${healthBounds[metric][i].getTime()}_${healthBounds[metric][i + 1].getTime()}`;
                    chartBands[metric].push(id);
                    this.chart.xAxis[0].addPlotBand({
                        from: healthBounds[metric][i].getTime(),
                        to: healthBounds[metric][i + 1].getTime(),
                        color: 'rgba(176, 0, 32, 0.2)',
                        id
                    })
                }
            }
        })

        changes.chartData.currentValue.metricsData && this.parseDataForSeries(changes.chartData.currentValue)

        //Main points
        if(this.series){
            this.series.forEach(series => {
                const currentChart = this.chart.series.find(_ => _.name == series.name);
                if (currentChart) {
                    this.chart.xAxis[0].setExtremes(moment().subtract(this.chartTimeWidth / 60000, "minutes").valueOf(), moment().valueOf(), false);
                    currentChart.update(series, true);
                } else {
                    this.chart.addSeries(series, true);
                }
                dataLength += series.data.length;
            });
        }

        //tresholder
        //todo check it work
        if (changes.chartData.currentValue.threshold && dataLength != 0) {
            const treshold = changes.chartData.currentValue.threshold;
            const currentChart = this.chart.series.find(_ => _.name == `${name}_threshold`);
            
            if (currentChart) {
                currentChart.update({ name: `${name}_threshold`, data: [treshold] }, true);
            } else {
                this.chart.addSeries({ name: `${name}_threshold`, data: [[new Date().getTime(), treshold]], type: 'scatter', showInLegend: false, marker: { enabled: false }, enableMouseTracking: false }, true);
            }
        } else {
            const currentChart = this.chart.series.find(_ => _.name == `${name}_threshold`);
            if (currentChart) {
                currentChart.remove(true);
            }
        }
    }

    get title(){
        return this.chartData.metricProvider.name;
    }

    onDelete(){
        this.delete.emit(this.chartData.metricProvider.id);
    }

    parseDataForSeries(chartData){
        const getModelName = (modelId): string => {
            return this.stage.services.filter(_ => _.modelVersion.id === ~~modelId).map(_ => _.modelVersion.modelName)[0];
        }

        const metrics = chartData.metricProvider.metrics;
        const metricsData = chartData.metricsData;

        metrics.forEach(metricName => {
            const groupedByModelVersionId: { [s: string]: any[] } = {}; 
            const metricData = metricsData.find(item => item.name === metricName);

            if(metricData){
                metricData.rows.filter(_ => _["columnIndex"] == null || _["columnIndex"] == '0').forEach(_ => {
                    if (!groupedByModelVersionId.hasOwnProperty(_["modelVersionId"])) {
                        groupedByModelVersionId[_["modelVersionId"]] = [];
                    }
                    groupedByModelVersionId[_["modelVersionId"]].push([_["time"].getTime(), _["value"]]);
                });

                const rows: Array<object> = metricData.rows;
                if (!this.healthBounds.hasOwnProperty[metricName]) {
                    this.healthBounds[metricName] = []
                }
                // this.healthBounds = <Date[]>[];
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
                this.series.push({
                    name: `${getModelName(key)}_${metricName}`,
                    data: groupedByModelVersionId[key]
                });
            };
        });
    }
}
