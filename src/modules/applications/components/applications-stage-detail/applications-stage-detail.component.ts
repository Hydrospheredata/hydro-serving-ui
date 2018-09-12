import { DialogDeleteMetricComponent, METRIC_ID_VALUE } from './../../../../app/components/dialogs/dialog-delete-metric/dialog-delete-metric.component';
import { GetMetricsAction } from './../../../core/actions/monitoring.actions';
import { MdlSelectModule } from '@angular-mdl/select';
import { Subscription } from 'rxjs/Subscription';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    ElementRef,
    ViewChild,
} from '@angular/core';

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

import { MetricSettings } from '@shared/models/metric-settings.model';
import { MetricsService } from '@core/services/metrics/metrics.service';
// import { MdlDialogReference } from '@angular-mdl/core';

import { IChartData, IMetricData } from '@applications/app-interfaces'

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
    public publicPath = '';
    public stageId: string;

    public isMonitoringAvailable: Boolean = false;

    public healthBounds: { [s: string]: Date[] } = {};
    public chartBands: { [s: string]: { [s: string]: string[] } } = {};
    public signatureName: any[];

    public application$: Observable<Application>;
    public params$: Observable<string>;
    public stage$: Observable<any>;

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

    public metricProviders;
    public objectKeys = Object.keys;
    public chartsData: { [s: string]: IChartData } = {};

    private timeoutId: number;
    private metricData: { [s: string]: IMetricData[] } = {};

    constructor(
        public store: Store<HydroServingState>,
        private influxdbService: InfluxDBService,
        // private repository: MetricSettingsService,
        private metricsService: MetricsService,
        private activatedRoute: ActivatedRoute,
        public selectRef: MdlSelectModule,
        public dialog: MdlDialogService
    ) {

    }

    ngOnInit() {
        this.application$ = this.store.select(fromApplications.getSelectedApplication).filter(_ => _ != undefined);
        this.params$ = this.activatedRoute.params.map(params => {
            this.stageId = Number(params['stageId']).toString();
            return this.stageId;
        })
        this.stage$ = this.store.select(fromApplications.getCurrentStage).filter(stage => stage);

        this.applicationSub = this.application$.subscribe(app => {
            this.activatedRouteSub = this.params$.subscribe(stageId => {
                this.stageSub = this.stage$.subscribe(stage => {
                        this.stage = stage;
                        this.store.dispatch(new GetMetricsAction(`app${app.id}stage${stageId}`));
                        this.initAggregations(stage, app.id, stageId);
                    });
            });
        });
    }

    ngOnDestroy() {
        console.log(`DESTROOOOOY!!!! ${this.timeoutId}`);
        clearInterval(this.timeoutId);
        this.stageSub && this.stageSub.unsubscribe();
        this.activatedRouteSub && this.activatedRouteSub.unsubscribe();
        this.applicationSub && this.applicationSub.unsubscribe();
        this.metricsSub && this.metricsSub.unsubscribe();
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

    private initAggregations(stage: number, applicationId: number, stageId: string): void {
        console.log(stage);
        // this.repository.getMetricSettings(stageId)
        this.metricsSub = this.store.select(fromMetrics.getSelectedMetrics)
            .filter(aggregations => aggregations.length > 0)
            .subscribe((aggregations: MetricSettings[]) => {
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

                const metricProviders = aggregations.map(_ => Object.assign({}, _.metricProviderSpecification, { name: _.name, id: _.id, timestamp: _.timestamp }, dict.metricProviders.find(x => x.className === _.metricProviderSpecification.metricProviderClass))).filter(_ => _.metrics);

                console.log(`CHART NAMES: `, metricProviders.sort((a, b) => ~~b.timestamp - ~~a.timestamp).map(_ => `${_.name}_${_.timestamp}`));
                
                this.chartsData = metricProviders.reduce((obj, metricProvider) => ({...obj, [metricProvider.name]: {name: metricProvider.name, metricProvider}}),{})

                metricProviders.forEach(metricProvider => {
                    if (metricProvider.healthConfig && metricProvider.healthConfig.hasOwnProperty("threshold")) {
                        this.thresholds[metricProvider.name] = parseFloat(metricProvider.healthConfig["threshold"]);
                    } else {
                        if (this.thresholds.hasOwnProperty(metricProvider.name)) {
                            delete this.thresholds[metricProvider.name];
                        }
                    }
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

    private updateChart(name: string, metrics: string[]) {        
        this.chartsData = {
            ...this.chartsData, 
            [name]: {
                      ...this.chartsData[name], metricsData: this.getMetricsData(metrics), threshold: this.thresholds[name],
                    }
            };
    }

    private getMetricsData(metrics): IMetricData[] {
        return metrics.map(metricName => this.metricData[metricName]).filter(_ => _).reduce((x, y) => x.concat(y), []) || [];
    }

    private getMetrics(applicationId: number, stageId: string, metrics: string[]): Promise<any> {
        // const query = `SELECT "value", "health", "modelVersionId"::tag, "columnIndex"::tag FROM ${metrics.map(_ => `"${_}"`).join(",")} WHERE "stageId" = '${stageId}' AND time >= now() - ${this.chartTimeWidth / 60000}m`;
        return this.metricsService.getMetrics(applicationId, stageId, this.chartTimeWidth, metrics)
            .then(result => {
                const res = this.influxdbService.parse(result);
                metrics.forEach(metric => {
                    const groupRows = (res as any).groupRows.find(_ => _.name === metric);
                    if (!groupRows) { return; }

                    this.metricData[metric] = groupRows;
                })
            });
    }


    deleteMetric(id: number){
        this.dialog.showCustomDialog({
            component: DialogDeleteMetricComponent,
            styles: { 'width': '600px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: METRIC_ID_VALUE, useValue: id }]
        });
    }
}
