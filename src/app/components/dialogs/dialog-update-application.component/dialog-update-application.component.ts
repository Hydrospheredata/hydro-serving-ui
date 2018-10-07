import { Component, OnInit, InjectionToken, Inject, OnDestroy } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import * as HydroActions from '@applications/actions/applications.actions';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

export let injectableServiceUpdate = new InjectionToken<Observable<Application>>('selectedService');

@Component({
    selector: 'hydro-dialog-update-application',
    templateUrl: './dialog-update-application.component.html',
    styleUrls: ['./dialog-update-application.component.scss']
})
export class DialogUpdateApplicationComponent implements OnInit, OnDestroy {
    public data$: Observable<Application>;
    public dataSub: Subscription;
    public data: Application;

    constructor(
        @Inject(injectableServiceUpdate) data: Observable<Application>,
        public store: Store<HydroServingState>,
        public dialogRef: MdlDialogReference,
    ) {
        this.data$ = data;
    }

    ngOnInit() {
        this.dataSub = this.data$.subscribe(data => {
            this.data = data;
        });
    }

    public close(){
        this.dialogRef.hide();
    }

    public onSubmit(formData) {
        formData.id = this.data.id;
        const application = new Application(formData);
        this.store.dispatch(new HydroActions.UpdateApplicationAction(application));

        this.close();
    }

    ngOnDestroy(){
        this.dataSub.unsubscribe();
    }
}
