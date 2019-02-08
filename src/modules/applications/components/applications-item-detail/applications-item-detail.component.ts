import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { InfluxDBService} from '@core/services';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { DialogService } from '@dialog/dialog.service';
import { Application, HealthRow, ModelVersion, ApplicationStatus, IApplication } from '@shared/models/_index';
import { Observable, Subscription, of } from 'rxjs';

import {
    DialogDeleteApplicationComponent,
    DialogUpdateApplicationComponent,
    DialogUpdateModelVersionComponent,
    SELECTED_MODEL_VARIANT,
    SELECTED_UPD_APPLICATION$,
    DialogTestComponent,
    SELECTED_APPLICATION$,
    LATEST_MODEL_VERSION_ID,
} from '@applications/components/dialogs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'hs-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent implements OnInit, OnDestroy {
    public application: IApplication;

    public application$: Observable<Application>;
    public modelVersions: ModelVersion[];

    public healthStatuses: { [s: string]: string } = {};
    private intervalId: number;
    private applicationSub: Subscription;

    constructor(
        public store: Store<HydroServingState>,
        public dialog: DialogService,
        private metricsService: MetricsService,
        private influxdbService: InfluxDBService
    ) {
        this.application$ = this.store.select(fromApplications.getSelectedApplication).pipe(
            tap( application => this.application = application)
        );

        this.applicationSub = this.application$.subscribe();
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
        this.applicationSub.unsubscribe();
    }

    public updateModelVersionDialog(lastModelVersionId, modelVariant) {
        this.dialog.createDialog({
            component: DialogUpdateModelVersionComponent,
            providers: [
                { provide: SELECTED_MODEL_VARIANT, useValue: modelVariant },
                { provide: LATEST_MODEL_VERSION_ID, useValue: lastModelVersionId },
            ],
        });
    }

    public testApplication(): void {
        this.dialog.createDialog({
            component: DialogTestComponent,
            providers: [{provide: SELECTED_APPLICATION$, useValue: this.application$}],
        });
    }

    public editApplication(): void {
        this.dialog.createDialog({
            component: DialogUpdateApplicationComponent,
            providers: [{ provide: SELECTED_UPD_APPLICATION$, useValue: this.application$ }],
            styles: {
                height: '100%',
            },
        });
    }

    public removeApplication() {
        this.dialog.createDialog({component: DialogDeleteApplicationComponent});
    }

    public isReady(status: string): boolean {
        return ApplicationStatus.Ready === status;
    }
}
