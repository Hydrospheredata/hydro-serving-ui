import { DialogDeleteMetricComponent, METRIC_ID_VALUE } from './../../../../app/components/dialogs/dialog-delete-metric/dialog-delete-metric.component';
import { GetMetricsAction } from './../../../core/actions/monitoring.actions';
import { MdlSelectModule } from '@angular-mdl/select';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    ElementRef,
    ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display.src';


import { Store } from '@ngrx/store';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
import { InfluxDBService } from '@core/services';

import * as fromApplications from '@applications/reducers';
import * as fromMetrics from '@core/reducers/index';
import { Observable } from 'rxjs/Observable';
// import { MetricSettingsService } from '@core/services/metrics/metric-settings.service';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogAddMetricComponent } from '@app/components/dialogs/_index';
import { MetricsService } from '@core/services/metrics/metrics.service';
// import { MdlDialogReference } from '@angular-mdl/core';



@Component({
    selector: 'hydro-applications-stage-detail',
    templateUrl: './applications-stage-detail.component.html',
    styleUrls: ['./applications-stage-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsStageDetailComponent implements OnInit, OnDestroy {
    @ViewChild('chartContainer') chartContainerRef: ElementRef;
    public id: number;
    public applications: Application[] = [];
    public application: Application;
    public stage: any;
    public chartNames: string[] = [];
    public application$: Observable<Application>;
    public publicPath = '';
    public stageId: string;

    public isMonitoringAvailable: Boolean = false;

    public charts: { [s: string]: Highcharts.ChartObject } = {};
    public confidenceChart: any;
    public chartData = {
        labels: [],
        datasets: []
    };
    public healthBounds: { [s: string]: Date[] } = {};
    public chartBands: { [s: string]: { [s: string]: string[] } } = {};
    public signatureName: any[];

    public stageSub: Subscription;
    public activatedRouteSub: Subscription;
    public applicationSub: Subscription;
    public metricsSub: Subscription;

    public thresholds: { [s: string]: number } = {};

    public chartTimeWidth: number = 1800000;
    public chartTimeWidthParams: { ms: number, text: string }[] = [
        { ms: 900000, text: "15 minutes" },
        { ms: 1800000, text: "30 minutes" },
        { ms: 3600000, text: "1 hour" },
        { ms: 7200000, text: "2 hours" },
        { ms: 14400000, text: "4 hours" }
    ];

    public KolmogorovSmirnovFeatures = this.getKolmogorovSmirnovFeatures();
    public KolmogorovSmirnovCurrentFeature: string = '0';

    private timeoutId: any;

    private series: { [s: string]: { name: string, data: any[] }[] } = {};

    constructor(
        public store: Store<HydroServingState>,
        private influxdbService: InfluxDBService,
        // private repository: MetricSettingsService,
        private metricsService: MetricsService,
        private activatedRoute: ActivatedRoute,
        public selectRef: MdlSelectModule,
        public dialog: MdlDialogService,
        private elementRef: ElementRef
    ) {

    }

    ngOnInit() {
        // this.store.select(fromMetrics.getAllMetrics).forEach(_ => console.log(_));
        this.elementRef.nativeElement.addEventListener("click", (event) => {
            console.log(event.target);
            if (event.target.classList.contains("js-delete-metric")) {
                console.log(`DELETE ${event.target.getAttribute("data-metric-name")} with id ${event.target.getAttribute("data-metric-id")}`);
                this.dialog.showCustomDialog({
                    component: DialogDeleteMetricComponent,
                    styles: { 'width': '600px', 'min-height': '250px' },
                    classes: '',
                    isModal: true,
                    clickOutsideToClose: true,
                    enterTransitionDuration: 400,
                    leaveTransitionDuration: 400,
                    providers: [{ provide: METRIC_ID_VALUE, useValue: event.target.getAttribute("data-metric-id") }]
                });
            }
        });

        this.application$ = this.store.select(fromApplications.getSelectedApplication)
        this.applicationSub = this.application$.filter(_ => _ != undefined).subscribe(app => {
            this.activatedRouteSub = this.activatedRoute.params.map(params => {
                this.stageId = Number(params['stageId']).toString();
                return this.stageId;
            })
                .subscribe(stageId => {
                    this.stageSub = this.store.select(fromApplications.getCurrentStage)
                        .filter(stage => stage)
                        .subscribe(stage => {
                            this.stage = stage;
                            this.store.dispatch(new GetMetricsAction(`app${app.id}stage${stageId}`));
                            this.initAggregations(stage, app.id, stageId);
                        });
                });
        })
    }

    ngOnDestroy() {
        console.log(`DESTROOOOOY!!!! ${this.timeoutId}`);
        clearInterval(this.timeoutId);
        this.stageSub.unsubscribe();
        this.activatedRouteSub.unsubscribe();
        this.applicationSub.unsubscribe();
        if (this.metricsSub) {
            this.metricsSub.unsubscribe();
        }
    }

    public addMetric() {
        this.dialog.showCustomDialog({
            component: DialogAddMetricComponent,
            styles: { 'width': '100%', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto', 'max-width': '1224px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
    }

    private initAggregations(stage, applicationId, stageId) {
        console.log(stage);
        // this.repository.getMetricSettings(stageId)
        this.metricsSub = this.store.select(fromMetrics.getSelectedMetrics)
            .filter(aggregations => aggregations.length > 0)
            .subscribe(aggregations => {
                this.isMonitoringAvailable = true;
                const dict = {
                    "metricProviders": [
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Counter",
                            "metrics": ["counter"],
                            "isSystem": true
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Average",
                            "metrics": ["avg"],
                            "isSystem": true,
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Min",
                            "metrics": ["min"],
                            "isSystem": true,
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Max",
                            "metrics": ["max"],
                            "isSystem": true,
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov",
                            "metrics": ["kolmogorovsmirnov", "kolmogorovsmirnov_level"],
                            "isSystem": false
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Autoencoder",
                            "metrics": ["autoencoder_reconstruction_error"],
                            "isSystem": false
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.RandomForest",
                            "metrics": ["random_forest_score"],
                            "isSystem": false
                        },
                        {
                            "className": "io.hydrosphere.sonar.core.metrics.providers.GAN",
                            "metrics": ["gan_outlier", "gan_inlier"],
                            "isSystem": false
                        }
                    ]
                };
                // let classes = aggregations.map(_ => _.metricProviderSpecification);
                const metricProviders = aggregations.map(_ => Object.assign({}, _.metricProviderSpecification, { name: _.name, id: _.id, timestamp: _.timestamp }, dict.metricProviders.find(x => x.className === _.metricProviderSpecification.metricProviderClass))).filter(_ => _.metrics);
                this.chartNames = metricProviders.sort((a, b) => ~~b.timestamp - ~~a.timestamp).map(_ => _.name);
                console.log(`CHART NAMES: `, metricProviders.sort((a, b) => ~~b.timestamp - ~~a.timestamp).map(_ => `${_.name}_${_.timestamp}`));
                this.clearCharts(metricProviders);
                metricProviders.forEach(metricProvider => {
                    if (metricProvider.healthConfig && metricProvider.healthConfig.hasOwnProperty("threshold")) {
                        this.thresholds[metricProvider.name] = parseFloat(metricProvider.healthConfig["threshold"]);
                    } else {
                        if (this.thresholds.hasOwnProperty(metricProvider.name)) {
                            delete this.thresholds[metricProvider.name];
                        }
                    }
                    // this.chartNames.push(metricProvider.name);
                    // TODO: whaaat
                    setTimeout(() => {
                        this.initChart(metricProvider);
                    }, 100)
                });
                const fn = (() => {
                    metricProviders.forEach(metricProvider => {
                        // TODO: whaaat
                        setTimeout(_ => {
                            this.getMetrics(applicationId, stageId, metricProvider.metrics).then(_ => this.updateChart(metricProvider.name, metricProvider.metrics));
                        }, 100)
                    });
                }).bind(this);
                clearInterval(this.timeoutId);
                this.timeoutId = setInterval(fn, 1500);
                console.log(`SETTING TIMEOUT ID: ${this.timeoutId}`);
                fn();
            }, (error) => {
                console.log("AAAAAAA");
                console.log(error);
            });
    }

    private clearCharts(metricProviders) {
        for (let key of Object.keys(this.charts)) {
            const mp = metricProviders.find(_ => _.name === key);
            if (!mp) {
                this.charts[key].destroy();
                delete this.charts[key];
            }
        }
    }

    private initChart(metricProvider/*name, metrics, withHealth, healthConfig*/) {
        HighchartsNoDataToDisplay(Highcharts);
        if (this.charts.hasOwnProperty(metricProvider.name)) {
            return;
        }

        const chartRef = this.chartContainerRef.nativeElement.querySelector(`[data-chart="${metricProvider.name}"]`);

        this.charts[metricProvider.name] = Highcharts.chart(chartRef, {
            credits: {
                enabled: false
            },
            chart: {
                type: 'spline'
            },
            title: metricProvider.isSystem ? { text: metricProvider.name } : {
                useHTML: true,
                text: `${metricProvider.name} <svg class="icon js-delete-metric" data-metric-id="${metricProvider.id}" data-metric-name="${metricProvider.name}" style="cursor: pointer; fill: #737373;"><use class="js-delete-metric" xlink:href="#icon-remove" data-metric-id="${metricProvider.id}" data-metric-name="${metricProvider.name}"  /></svg>`
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

    private updateChart(name: string, metrics: string[]) {
        // console.log(this.series);
        if (!this.chartBands.hasOwnProperty(name)) {
            this.chartBands[name] = {};
        }
        // this.charts[name].xAxis[0]

        // console.log("~~~~~~~~~~~~START");
        // console.log(this.thresholds);
        // console.log("~~~~~~~~~~~~END");
        metrics.forEach(metric => {
            if (!this.charts.hasOwnProperty(name)) {
                return;
            }
            if (!this.healthBounds[metric]) return;
            // const bands = [];
            if (!this.chartBands[name].hasOwnProperty(metric)) {
                this.chartBands[name][metric] = [];
            }
            this.chartBands[name][metric].forEach(_ => this.charts[name].xAxis[0].removePlotBand(_));
            this.chartBands[name][metric] = [];
            for (let i = 0; i < this.healthBounds[metric].length; i += 2) {
                // this.charts[name].xAxis[0].addPlotBand({
                //     color: 'red',
                //     from
                // });
                if (i < this.healthBounds[metric].length && i + 1 < this.healthBounds[metric].length) {
                    const id = `${this.healthBounds[metric][i].getTime()}_${this.healthBounds[metric][i + 1].getTime()}`;
                    this.chartBands[name][metric].push(id);
                    this.charts[name].xAxis[0].addPlotBand({
                        from: this.healthBounds[metric][i].getTime(),
                        to: this.healthBounds[metric][i + 1].getTime(),
                        color: 'rgba(176, 0, 32, 0.2)',
                        id
                    })
                }
            }
        })
        let dataLength = 0;
        metrics.map(_ => this.series[_]).filter(_ => _).reduce((x, y) => x.concat(y), []).forEach(series => {
            if (!this.charts.hasOwnProperty(name)) {
                return;
            }
            const currentChart = this.charts[name].series.find(_ => _.name == series.name);
            if (currentChart) {
                this.charts[name].xAxis[0].setExtremes(moment().subtract(this.chartTimeWidth / 60000, "minutes").valueOf(), moment().valueOf(), false);
                // this.charts[name].xAxis[0].addPlotBand();
                // this.charts[name].update({series: [series]}, true);
                currentChart.update(series, true);
            } else {
                this.charts[name].addSeries(series, true);
            }
            dataLength += series.data.length;
        });
        console.log(`data length ${dataLength}`);
        if (!this.charts.hasOwnProperty(name)) {
            return;
        }
        if (this.thresholds.hasOwnProperty(name) && dataLength != 0) {
            // debugger;
            const currentChart = this.charts[name].series.find(_ => _.name == `${name}_threshold`);
            if (currentChart) {
                currentChart.update({ name: `${name}_threshold`, data: [this.thresholds[name]] }, true);
            } else {
                this.charts[name].addSeries({ name: `${name}_threshold`, data: [[new Date().getTime(), this.thresholds[name]]], type: 'scatter', showInLegend: false, marker: { enabled: false }, enableMouseTracking: false }, true);
            }
        } else {
            const currentChart = this.charts[name].series.find(_ => _.name == `${name}_threshold`);
            if (currentChart) {
                currentChart.remove(true);
            }
        }
    }

    private getMetrics(applicationId: number, stageId: number, metrics: string[]): Promise<any> {
        const getModelName = (modelId): string => {
            return this.stage.services.filter(_ => _.modelVersion.id === ~~modelId).map(_ => _.modelVersion.modelName)[0];
        }

        // const query = `SELECT "value", "health", "modelVersionId"::tag, "columnIndex"::tag FROM ${metrics.map(_ => `"${_}"`).join(",")} WHERE "stageId" = '${stageId}' AND time >= now() - ${this.chartTimeWidth / 60000}m`;
        return this.metricsService.getMetrics(applicationId, stageId, this.chartTimeWidth, metrics)
            .then(result => {
                const res = this.influxdbService.parse(result);
                metrics.forEach(metric => {
                    const groupedByModelVersionId: { [s: string]: any[] } = {}
                    const groupRows = (res as any).groupRows.find(_ => _.name === metric);
                    if (!groupRows) {
                        return;
                    }

                    let filteredColumnIndex = '0';
                    if(['kolmogorovsmirnov_level', 'kolmogorovsmirnov'].includes(metric)){
                        filteredColumnIndex = this.KolmogorovSmirnovCurrentFeature;
                    }

                    groupRows.rows.filter(_ => _["columnIndex"] == null || _["columnIndex"] == filteredColumnIndex).forEach(_ => {
                        if (!groupedByModelVersionId.hasOwnProperty(_["modelVersionId"])) {
                            groupedByModelVersionId[_["modelVersionId"]] = [];
                        }
                        groupedByModelVersionId[_["modelVersionId"]].push([_["time"].getTime(), _["value"]]);
                    });
                    const rows: Array<object> = groupRows.rows;
                    if (!this.healthBounds.hasOwnProperty[metric]) {
                        this.healthBounds[metric] = []
                    }
                    // this.healthBounds = <Date[]>[];
                    for (let i in rows) {
                        if (rows[i]["health"] === 0) {
                            if (~~i === 0 || rows[~~i - 1]["health"] === 1 || ~~i === rows.length - 1) {
                                this.healthBounds[metric].push(rows[i]["time"]);
                            }
                        }
                        if (rows[i]["health"] === 1) {
                            if (~~i !== 0 && rows[~~i - 1]["health"] === 0) {
                                this.healthBounds[metric].push(rows[~~i - 1]["time"]);
                            }
                        }
                    }

                    // console.log("~~~~~~~~~");
                    // console.log(healthBounds);
                    // console.log("~~~~~~~~~");
                    this.series[metric] = [];
                    for (let key in groupedByModelVersionId) {
                        this.series[metric].push({
                            name: `${getModelName(key)}_${metric}`,
                            data: groupedByModelVersionId[key]
                        });
                    }
                })
            });
    }

    private getKolmogorovSmirnovFeatures(){
        let features = [];
        for(let i = 0; i < 112;i++){
            features.push({
                index: i
            });
        };
        return features;
    }
}
