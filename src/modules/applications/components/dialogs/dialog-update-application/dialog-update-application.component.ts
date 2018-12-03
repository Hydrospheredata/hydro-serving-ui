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
    public data$: Observable<Application>;
    public dataSub: Subscription;
    public data: Application;

    constructor(
        @Inject(SELECTED_UPD_APPLICATION$) data: Observable<Application>,
        public store: Store<HydroServingState>,
        public dialog: DialogService
    ) {
        this.data$ = data;
    }

    ngOnInit(): void {
        this.dataSub = this.data$.subscribe(data => {
            this.data = data;
        });
    }

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onSubmit(formData) {
        formData.id = this.data.id;
        const application = new Application(formData);
        this.store.dispatch(new HydroActions.UpdateApplicationAction(application));

        this.onClose();
    }

    ngOnDestroy(): void {
        this.dataSub.unsubscribe();
    }
}
