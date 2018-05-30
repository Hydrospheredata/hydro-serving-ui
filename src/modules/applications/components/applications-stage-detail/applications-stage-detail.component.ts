import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    ElementRef,
    ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts';

import { Store } from '@ngrx/store';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
import { InfluxDBService } from '@core/services';

import * as fromApplications from '@applications/reducers';
import { Observable } from 'rxjs/Observable';
import { MetricSettingsService } from '@core/services/metrics/metric-settings.service';
import { ActivatedRoute } from '@angular/router';



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

    public charts: {[s: string]: Highcharts.ChartObject} = {};
    public confidenceChart: any;
    public chartData = {
        labels: [],
        datasets: []
    };
    public signatureName: any[];

    public stageSub: Subscription;
    public activatedRouteSub: Subscription;
    public applicationSub: Subscription;

    private timeoutId: any;

    private series: {[s: string]: { name: string, data: any[] }[]} = {};

    constructor(
        public store: Store<HydroServingState>,
        private influxdbService: InfluxDBService,
        private repository: MetricSettingsService,
        private activatedRoute: ActivatedRoute
    ) {
        this.application$ = this.store.select(fromApplications.getSelectedApplication)
        this.applicationSub = this.application$.filter(_ => _ != undefined).subscribe(app => {
            this.activatedRouteSub = this.activatedRoute.params.map(params =>  {
                this.stageId = Number(params['stageId']).toString();
                return this.stageId;
            })
            .subscribe(stageId => {
                this.stageSub = this.store.select(fromApplications.getCurrentStage)
                .filter(stage => stage)
                .subscribe(stage => {
                    this.stage = stage;
                    this.initAggregations(stage, `app${app.id}stage${stageId}`, app.id);
                });
            });
        })
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.stageSub.unsubscribe();
        this.activatedRouteSub.unsubscribe();
        this.applicationSub.unsubscribe();
        console.log(this.timeoutId);
        clearInterval(this.timeoutId);
     }

    private initAggregations(stage, stageId, appId) {
        console.log(stage);
        this.repository.getMetricSettings(stageId)
            .subscribe(aggregations => {
                const dict = {
                    "metricProviders": [
                        {
                            "name": "Count",
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Counter",
                            "metrics": ["counter"],
                            "isSystem": true
                        },
                        {
                            "name": "Latency",
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Average",
                            "metrics": ["avg"],
                            "isSystem": true,
                        },
                        {
                            "name": "KolmogorovSmirnov",
                            "className": "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov",
                            "metrics": ["kolmogorovsmirnov", "kolmogorovsmirnov_level"],
                            "isSystem": false
                        },
                        {
                            "name": "Autoencoder",
                            "className": "io.hydrosphere.sonar.core.metrics.providers.Autoencoder",
                            "metrics": ["autoencoder_reconstruction_error"],
                            "isSystem": false
                        }
                    ]
                };
                let classes = aggregations.map(_ => _.metricProviderSpecification).reduce((x, y) => x.concat(y)).map(_ => _.metricProviderClass);
                if (appId == 2) {
                    classes = classes.filter(_ => _ != "io.hydrosphere.sonar.core.metrics.providers.Autoencoder").filter(_ => _ != "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov");
                }
                const metricProviders = classes.map(_ => dict.metricProviders.find(x => x.className === _)).filter(_ => _);
                metricProviders.forEach(metricProvider => {
                    this.chartNames.push(metricProvider.name);
                    // TODO: whaaat
                    setTimeout(() => {
                        this.initChart(metricProvider.name, metricProvider.metrics);
                    }, 100)
                });
                const fn = (() => {metricProviders.forEach(metricProvider => {
                    // TODO: whaaat
                    setTimeout(_ => {
                        this.getMetrics(stageId, metricProvider.metrics).then(_ => this.updateChart(metricProvider.name, metricProvider.metrics));
                    }, 100)
                });}).bind(this);
                this.timeoutId = setInterval(fn, 1500);
                fn();
            });
    }

    private initChart(name, metrics) {
        const chartRef = Array.prototype.slice.call(this.chartContainerRef.nativeElement.children).find(_ => _.getAttribute("data-chart") == name)
        this.charts[name] = Highcharts.chart(chartRef, {
            credits: {
                enabled: false
            },
            chart: {
                type: 'spline'
            },
            title: {
                text: name
            },
            xAxis: {
                title: {
                    text: 'Time'
                },
                type: "datetime",
                gridLineWidth: 1,
                max: new Date().getTime(),
                min: moment().subtract(30, "minutes").valueOf()
            },
            yAxis: {
                title: {
                    text: metrics.join(",")
                }
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
        });
    }

    private updateChart(name: string, metrics: string[]) {
        console.log(this.series);
        metrics.map(_ => this.series[_]).filter(_ => _).reduce((x, y) => x.concat(y), []).forEach(series => {
            const currentChart = this.charts[name].series.find(_ => _.name == series.name);
            if (currentChart) {
                this.charts[name].xAxis[0].setExtremes(moment().subtract(30, "minutes").valueOf(), moment().valueOf(), false);
                // this.charts[name].update({series: [series]}, true);
                currentChart.update(series, true);
            } else {
                this.charts[name].addSeries(series, true)
            }
        });
    }

    private getMetrics(stageId: string, metrics: string[]) {
        const getModelName = (modelId): string => {
            return this.stage.services.filter(_ => _.serviceDescription.modelVersionId === ~~modelId).map(_ => _.serviceDescription.modelName)[0];
        }

        const query = `SELECT "value", "modelVersionId"::tag, "columnIndex"::tag FROM ${metrics.map(_ => `"${_}"`).join(",")} WHERE "stageId" = '${stageId}' AND time >= now() - 30m`;
        return this.influxdbService.search(query)
            .then(res => {
                console.log(res)
                metrics.forEach(metric => {
                    const groupedByModelVersionId: { [s: string]: any[] } = {}
                    const groupRows = (res as any).groupRows.find(_ => _.name === metric);
                    if (!groupRows) {
                        return;
                    }
                    groupRows.rows.filter(_ => _["columnIndex"] == null || _["columnIndex"] == "0").forEach(_ => {
                        if (!groupedByModelVersionId.hasOwnProperty(_["modelVersionId"])) {
                            groupedByModelVersionId[_["modelVersionId"]] = [];
                        }
                        groupedByModelVersionId[_["modelVersionId"]].push([_["time"].getTime(), _["value"]]);
                    });
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
}
