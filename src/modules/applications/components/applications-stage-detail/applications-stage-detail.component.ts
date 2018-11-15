import { DialogDeleteMetricComponent, METRIC_ID_VALUE } from './../../../../app/components/dialogs/dialog-delete-metric/dialog-delete-metric.component';
import { GetMetricsAction } from './../../../core/actions/monitoring.actions';
import { MdlSelectModule } from '@angular-mdl/select';
import { Subscription ,  Observable ,  of ,  combineLatest } from 'rxjs';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    ElementRef,
    ViewChild,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';

import * as fromApplications from '@applications/reducers';
import * as fromMetrics from '@core/reducers/index';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogAddMetricComponent } from '@app/components/dialogs/_index';

import { MetricSettings } from '@shared/models/metric-settings.model';

import { IChartData } from '@shared/models/application-chart.model'

import { tap, map, filter, catchError } from 'rxjs/operators'
import { MetricSpecification } from '@shared/models/metric-specification.model';
export interface MetricProvider extends MetricSpecification {
    name: string,
    id: string,
    timestamp: number,
    className: string,
    metrics: string[]
}

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

    private mainSub: Subscription;
    private metricsSub: Subscription;


    constructor(
        public store: Store<HydroServingState>,
        private activatedRoute: ActivatedRoute,
        public selectRef: MdlSelectModule,
        public dialog: MdlDialogService
    ) {
    }


    ngOnInit() {
        this.application$ = this.store.select(fromApplications.getSelectedApplication).pipe(filter(_ => _ != undefined));
        this.params$ = this.activatedRoute.params.pipe(map(params => {
            this.stageId = Number(params['stageId']).toString();
            return this.stageId;
        }));
        this.stage$ = this.store.select(fromApplications.getCurrentStage).pipe(filter(stage => !!stage));

        this.mainSub = combineLatest(this.application$, this.params$, this.stage$).subscribe(
            ([app, stageId, stage]) => {
                console.log(`%c ${app} ${stageId} ${stage}`, 'color: blue');
                this.application = app;
                this.stageId = stageId;
                this.stage = stage;
                this.store.dispatch(new GetMetricsAction(`app${app.id}stage${stageId}`));
                this.initAggregations();
            }
        )
    }

    ngOnDestroy() {
        this.metricsSub && this.metricsSub.unsubscribe();
        this.mainSub.unsubscribe();
    }

    public addMetric() {
        this.dialog.showCustomDialog({
            component: DialogAddMetricComponent,
            styles: { 'width': 'fit-content', 'min-width': '600px', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto', 'max-width': '1224px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
    }

    private initAggregations(): void {
        this.metricsSub = this.store.select(fromMetrics.getSelectedMetrics).pipe(
            filter(aggregations => aggregations.length > 0),
            tap(_ => this.isMonitoringAvailable = true),
            map(aggregations => this.createMetricProviders(aggregations)),
            tap(metricProviders => {
                this.initChartsData(metricProviders);
            }),
            catchError(error => {
                console.error("AAAAAAA");
                console.error(error);
                return of(`error ${error}`)
            })
        ).subscribe()
    }

    private createMetricProviders(metricSettings: MetricSettings[]): MetricProvider[] {
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

        return metricSettings.map(_ => 
            Object.assign(
                {}, 
                _.metricProviderSpecification, 
                { 
                    name: _.name, 
                    id: _.id, 
                    timestamp: _.timestamp 
                }, 
                dict.metricProviders.find(x => 
                    x.className === _.metricProviderSpecification.metricProviderClass
                )
            )
        ).filter(_ => _.metrics);
    }

    private initChartsData(metricProviders: MetricProvider[]): void {
        this.chartsData = metricProviders
            .reduce((obj, metricProvider) => (
                {
                    ...obj,
                    [metricProvider.name]: { name: metricProvider.name, metricProvider }
                }
            ), {})
    }

    deleteMetric(id: number){
        this.dialog.showCustomDialog({
            component: DialogDeleteMetricComponent,
            styles: { 'width': 'fit-content', 'max-width': '400px', 'min-height': '120px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: METRIC_ID_VALUE, useValue: id }]
        });
    }
}
