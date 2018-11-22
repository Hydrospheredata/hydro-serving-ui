import { Component, OnInit, InjectionToken, Inject, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as HydroActions from '@applications/actions/applications.actions';
import { HydroServingState } from '@core/reducers';
import { Application } from '@shared/models/_index';
import { Observable ,  Subscription } from 'rxjs';

import { MdlDialogReference } from '@angular-mdl/core';

export let injectableServiceUpdate = new InjectionToken<Observable<Application>>('selectedService');

@Component({
    selector: 'hydro-dialog-update-application',
    templateUrl: './dialog-update-application.component.html',
    styleUrls: ['./dialog-update-application.component.scss'],
})
export class DialogUpdateApplicationComponent implements OnInit, OnDestroy {
    public data$: Observable<Application>;
    public dataSub: Subscription;
    public data: Application;

    constructor(
        @Inject(injectableServiceUpdate) data: Observable<Application>,
        public store: Store<HydroServingState>,
        public dialogRef: MdlDialogReference
    ) {
        this.data$ = data;
    }

    ngOnInit(): void {
        this.dataSub = this.data$.subscribe(data => {
            this.data = data;
        });
    }

    public close(): void {
        this.dialogRef.hide();
    }

    public onSubmit(formData) {
        formData.id = this.data.id;
        const application = new Application(formData);
        this.store.dispatch(new HydroActions.UpdateApplicationAction(application));

        this.close();
    }

    ngOnDestroy(): void {
        this.dataSub.unsubscribe();
    }
}
