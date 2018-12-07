import { Component, OnInit, InjectionToken, Inject, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as HydroActions from '@applications/actions/applications.actions';
import { HydroServingState } from '@core/reducers';
import { Application } from '@shared/models/_index';
import { Observable ,  Subscription } from 'rxjs';

import { DialogService } from '@dialog/dialog.service';

export let SELECTED_UPD_APPLICATION$ = new InjectionToken<Observable<Application>>('selectedApplication');

@Component({
    selector: '',
    templateUrl: './dialog-update-application.component.html',
})
export class DialogUpdateApplicationComponent implements OnInit, OnDestroy {
    public application$: Observable<Application>;
    public applicationSub: Subscription;
    public application: Application;

    constructor(
        @Inject(SELECTED_UPD_APPLICATION$) application: Observable<Application>,
        public store: Store<HydroServingState>,
        public dialog: DialogService
    ) {
        this.application$ = application;
    }

    ngOnInit(): void {
        this.applicationSub = this.application$.subscribe(application => {
            this.application = application;
        });
    }

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onSubmit(formData) {
        formData.id = this.application.id;
        const application = new Application(formData);
        this.store.dispatch(new HydroActions.UpdateApplicationAction(application));

        this.onClose();
    }

    ngOnDestroy(): void {
        this.applicationSub.unsubscribe();
    }
}
