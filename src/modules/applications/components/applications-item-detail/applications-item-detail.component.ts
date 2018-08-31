// import * as moment from 'moment';
import { Component, ViewEncapsulation } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
// import { chart } from 'highcharts';
// import * as Highcharts from 'highcharts';
// import * as hocon from 'hocon-parser';

import { Store } from '@ngrx/store';
import { Application, Model } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
// import { InfluxDBService } from '@core/services';
// import { environment } from '@environments/environment';

import * as fromApplications from '@applications/reducers';
import * as fromModels from '@models/reducers';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogTestComponent,
    injectableServiceUpdate,
    DialogUpdateModelVersionComponent, 
    CHANGE_IDS
} from '@components/dialogs/_index';
import { Observable } from 'rxjs/Observable';
import { InfluxDBService } from '@core/services';
// import { UpdateApplicationAction } from '@applications/actions';

@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsItemDetailComponent {
    public application: Application;

    public application$: Observable<Application>;
    public models: Model[];

    public healthStatuses: { [s: string]: string } = {};
    private intervalId: number;

    constructor(
        public store: Store<HydroServingState>,
        public dialog: MdlDialogService,
        private influxdbService: InfluxDBService
    ) {
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        this.store.select(fromModels.getAllModels)
            .filter(models => models.length > 0)
            .subscribe(models => this.models = models)
    }

    // TODO: remove me please
    public getHealthClass() {
        // const stageId = `app${applicationId}stage${stageIndex}`;
        const query = `select sum("health"), count("health") from /.*/ where time >= now() - 1m group by "stageId", "modelVersionId"`;
        return this.influxdbService.search(query).then((result) => {
            const aggregatedHealthStatus: Object = {};
            console.log(result);
            // debugger;
            for (let row of result) {
                const stageAndModelVersion = `${row['stageId']}_${row["modelVersionId"]}`;
                if (!aggregatedHealthStatus.hasOwnProperty(stageAndModelVersion)) {
                    aggregatedHealthStatus[stageAndModelVersion] = true;
                }
                aggregatedHealthStatus[stageAndModelVersion] = aggregatedHealthStatus[stageAndModelVersion] && row['sum'] >= row['count'];
            }
            // console.log(aggregatedHealthStatus);
            const newStatuses = {}
            for (let key in aggregatedHealthStatus) {
                console.log(`setting ${aggregatedHealthStatus[key] ? "good" : "bad"} to ${key}`);
                newStatuses[key] = aggregatedHealthStatus[key] ? "good" : "bad";
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
    }

    public checkNewVersion(modelVersionData) {
        const {modelName, modelVersion} = modelVersionData;

        if (this.models) {
            const modell = this.models.find(model => model.name === modelName);
            return modell.lastModelBuild.version > modelVersion;
        }
    }

    public updateModelVersionDialog(stageId, serviceId) {
        this.dialog.showCustomDialog({
            component: DialogUpdateModelVersionComponent,
            styles: { 'width': '600px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: CHANGE_IDS , useValue: {stageId, serviceId}}]
        });
    }

    public testApplication() {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: { 'width': '900px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }

    public editApplication(application: Observable<Application>) {
        this.dialog.showCustomDialog({
            component: DialogUpdateServiceComponent,
            styles: { 'width': '100%', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto', 'max-width': '1224px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableServiceUpdate, useValue: application }]
        });
    }

    public removeApplication() {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: { 'width': '600px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }
}
