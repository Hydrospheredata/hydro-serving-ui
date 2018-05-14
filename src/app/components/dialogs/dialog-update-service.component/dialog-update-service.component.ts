import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ApplicationsDialogBase } from '@shared/base/_index';
import { FormsService } from '@core/services/_index';
import * as HydroActions from '@modules/applications/actions/applications.actions';
import { ApplicationState, Application } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Application>('selectedService');



@Component({
    selector: 'hydro-dialog-update-service',
    templateUrl: './dialog-update-service.component.html',
    styleUrls: ['./dialog-update-service.component.scss']
})
export class DialogUpdateServiceComponent extends ApplicationsDialogBase implements OnInit {

    public weightsForSlider: any[] = [];
    public selectedModels: any[] = [];
    public data: Application;

    constructor(
        @Inject(injectableServiceUpdate) data: Application,
        public store: Store<ApplicationState>,
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store
        );
        this.data = data;
    }

    ngOnInit() {
        this.createForm(this.data);
        this.initFormChangesListener();
    }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const serviceInfo = {
            id: this.data.id,
            name: this.serviceForm.value.applicationName,
            kafkaStreaming: this.isKafkaEnabled ? this.serviceForm.value.kafkaStreaming : [],
            executionGraph: {
                stages: this.prepareFormDataToSubmit()
            }
        };

        const application = new Application(serviceInfo);

        this.store.dispatch(new HydroActions.UpdateApplicationAction(application));
        this.dialogRef.hide();
    }

}
