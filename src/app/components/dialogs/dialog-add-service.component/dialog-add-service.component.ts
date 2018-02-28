import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { ApplicationsDialogBase } from '@shared/base/_index';
import * as Actions from '@shared/actions/_index';
import { 
    AppState, 
    Application 
} from '@shared/models/_index';
import { FormsService, ApplicationsService } from '@shared/services/_index';



@Component({
    selector: 'hydro-dialog-add-service',
    templateUrl: './dialog-add-service.component.html',
    styleUrls: ['./dialog-add-service.component.scss']
})
export class DialogAddServiceComponent extends ApplicationsDialogBase implements OnInit {

    public dialogType: string = 'Add';

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<AppState>,
        public applicationsService: ApplicationsService
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store
        );
    }

    ngOnInit() {
        this.createForm();
        this.initFormChangesListener();
    }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const serviceInfo = {
            name: this.serviceForm.value.applicationName,
            kafkaStreaming: this.isKafkaEnabled ? this.serviceForm.value.kafkaStreaming : [],
            executionGraph: {
                stages: this.prepareFormDataToSubmit()
            }
        };

        const application = new Application(serviceInfo);

        console.log(application);

        this.applicationsService.addApplication(application)
            .subscribe(response => {
                this.store.dispatch({ type: Actions.ADD_SERVICE_SUCCESS, payload: new Application(response) });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Application was successfully added',
                    timeout: 5000
                });
            },
            error => {
                this.mdlSnackbarService.showSnackbar({
                    message: `Error: ${error}`,
                    timeout: 5000
                });
            });
    }

}
