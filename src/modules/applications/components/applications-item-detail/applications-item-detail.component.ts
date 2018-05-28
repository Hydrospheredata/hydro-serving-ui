// import * as moment from 'moment';
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
// import { chart } from 'highcharts';
// import * as Highcharts from 'highcharts';

import { Store } from '@ngrx/store';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
// import { InfluxDBService } from '@core/services';
// import { environment } from '@environments/environment';

import * as fromApplications from '@applications/reducers';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogTestComponent,
    injectableServiceUpdate
} from '@components/dialogs/_index';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsItemDetailComponent {
    public application: Application;

    public application$: Observable<Application>;

    constructor(
        public store: Store<HydroServingState>,
        public dialog: MdlDialogService,
    ) {
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
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
