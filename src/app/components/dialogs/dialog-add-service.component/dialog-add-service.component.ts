import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { ApplicationsDialogBase } from '@shared/base/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, Service } from '@shared/models/_index';
import { FormsService, ServicesService } from '@shared/services/_index';



@Component({
    selector: 'hydro-dialog-add-service',
    templateUrl: './dialog-add-service.component.html',
    styleUrls: ['./dialog-add-service.component.scss'],
    providers: [FormsService]
    })
export class DialogAddServiceComponent extends ApplicationsDialogBase implements OnInit {

    public dialogType: string = 'Add';

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<AppState>,
        public servicesService: ServicesService
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store,
            servicesService
        );
    }

    ngOnInit() {
        this.createServiceForm();
        this.initFormChangesListener();
    }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const data = this.getFormData(this.serviceForm);

        const serviceInfo = {
            id: 0,
            serviceName: this.serviceForm.value.serviceName,
            kafkaStreamingSources: this.isKafkaEnabled ? data.kafkaStreamingSources : [],
        };

        serviceInfo.kafkaStreamingSources.forEach(kafka => {
            kafka.serviceId = 0;
        });

        const service = Object.assign( serviceInfo, { stages: data.stages } );

        // TODO: try to add actions after successfully adding in effects (in each file)
        this.servicesService.addService(service)
            .subscribe(response => {
                this.store.dispatch({ type: Actions.ADD_SERVICE_SUCCESS, payload: new Service(response) });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully added',
                    timeout: 5000
                });
            });
        // this.store.dispatch({ type: Actions.ADD_SERVICE, payload: service });
        // this.dialogRef.hide();
        // this.mdlSnackbarService.showSnackbar({
        //     message: 'Service was successfully added',
        //     timeout: 5000
        // });
    }

}
