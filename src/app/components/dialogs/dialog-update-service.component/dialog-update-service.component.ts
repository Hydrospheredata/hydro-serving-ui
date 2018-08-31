import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import * as HydroActions from '@applications/actions/applications.actions';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
import { Observable } from 'rxjs/Observable';

export let injectableServiceUpdate = new InjectionToken<Observable<Application>>('selectedService');



@Component({
    selector: 'hydro-dialog-update-service',
    templateUrl: './dialog-update-service.component.html'
})
export class DialogUpdateServiceComponent implements OnInit {
    public data$: Observable<Application>;
    public data: Application;

    constructor(
        @Inject(injectableServiceUpdate) data: Observable<Application>,
        public store: Store<HydroServingState>,
        public dialogRef: MdlDialogReference,
    ) {
        this.data$ = data;
    }

    ngOnInit() {
        this.data$.subscribe(data => this.data = data);
    }

    onSubmit(formData) {
        formData.id = this.data.id;
        const application = new Application(formData);
        this.store.dispatch(new HydroActions.UpdateApplicationAction(application));
        this.dialogRef.hide();
    }
}
