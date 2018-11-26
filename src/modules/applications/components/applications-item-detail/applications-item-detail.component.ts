import { Component, ViewEncapsulation } from '@angular/core';

import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';

import {
    DialogUpdateApplicationComponent,
    DialogTestComponent,
    SELECTED_APPLICATION$,
    injectableServiceUpdate,
    DialogUpdateModelVersionComponent,
    DialogDeleteApplicationComponent,
    SELECTED_SERVICE
} from '@components/dialogs/_index';
import { Observable ,  Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { MdlDialogService } from '@angular-mdl/core';
import { InfluxDBService} from '@core/services';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { Application, Model, HealthRow } from '@shared/models/_index';

@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent {
    public application: Application;

    public application$: Observable<Application>;
    public models: Model[];

    public healthStatuses: { [s: string]: string } = {};
    private intervalId: number;
    private modelSub: Subscription;

    constructor(
        public store: Store<HydroServingState>,
        public dialog: MdlDialogService,
        private metricsService: MetricsService,
        private influxdbService: InfluxDBService
    ) {
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        this.modelSub = this.store.select(fromModels.getAllModels).pipe(
            filter(models => models.length > 0),
            tap(models => this.models = models)
        ).subscribe();
    }

    // TODO: remove me please
    public getHealthClass(): Promise<void> {
        return this.metricsService.getHealth().then(res => {
            const result = this.influxdbService.parse<HealthRow>(res);
            const aggregatedHealthStatus: object = {};

            for (const row of result) {
                const key = `${row.stageId}_${row.modelVersionId}`;
                if (!aggregatedHealthStatus.hasOwnProperty(key)) {
                    aggregatedHealthStatus[key] = true;
                }

                aggregatedHealthStatus[key] = aggregatedHealthStatus[key] && row.sum >= row.count;
            }
            // console.log(aggregatedHealthStatus);
            const newStatuses = {};

            for (const key in aggregatedHealthStatus) {
                if (aggregatedHealthStatus.hasOwnProperty(key) ) {
                    console.log(`setting ${aggregatedHealthStatus[key] ? 'good' : 'bad'} to ${key}`);
                    newStatuses[key] = aggregatedHealthStatus[key] ? 'good' : 'bad';
                }

            }
            this.healthStatuses = newStatuses;
        });
    }

    ngOnInit() {
        this.intervalId = setInterval(this.getHealthClass.bind(this), 1500);
        this.getHealthClass();

    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
        if (this.modelSub) {
            this.modelSub.unsubscribe();
        }
    }

    public checkNewVersion(modelVersionData): boolean {
        const { modelName, modelVersion } = modelVersionData;

        if (this.models) {
            const modell = this.models.find(model => model.name === modelName);
            return modell.lastModelVersion.modelVersion > modelVersion;
        }
    }

    public updateModelVersionDialog(service) {
        this.dialog.showCustomDialog({
            component: DialogUpdateModelVersionComponent,
            styles: {
                'width': 'fit-content',
                'max-width': '400px',
                'min-height': '120px',
            },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [
                {
                    provide: SELECTED_SERVICE,
                    useValue: service,
                },
            ],
        });
    }

    public testApplication(application: Observable<Application>) {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: {
                'width': '900px',
                'height': '100%',
                'min-height': '250px',
                'max-height': 'calc(100% - 100px)',
                'overflow': 'scroll',
            },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: SELECTED_APPLICATION$, useValue: application}],
        });
    }

    public editApplication(application: Observable<Application>) {
        this.dialog.showCustomDialog({
            component: DialogUpdateApplicationComponent,
            styles: {
                'width': '100%',
                'height': '100%',
                'min-height': '250px',
                'max-height': '90vh',
                'overflow': 'auto',
                'max-width': '840px',
            },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableServiceUpdate, useValue: application }],
        });
    }

    public removeApplication() {
        this.dialog.showCustomDialog({
            component:  DialogDeleteApplicationComponent,
            styles: {'min-height': '120px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }
}
