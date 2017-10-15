import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { DialogBase } from '@shared/base/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, Service } from '@shared/models/_index';
import { FormsService, ServicesService } from '@shared/services/_index';



@Component({
  selector: 'hydro-dialog-add-service',
  templateUrl: './dialog-add-service.component.html',
  styleUrls: ['./dialog-add-service.component.scss'],
  providers: [FormsService]
})
export class DialogAddServiceComponent extends DialogBase implements OnInit {

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
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
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
            id: this.services.length ? this.services[this.services.length - 1].id + 1 : 1,
            serviceName: this.serviceForm.value.serviceName,
            kafkaStreamingSources: this.isKafkaEnabled ? data.kafkaStreamingSources : [],
        };

        const service = new Service(Object.assign( serviceInfo, { weights: data.weights } ));

        this.servicesService.addService(service)
            .subscribe(services => {
                this.store.dispatch({ type: Actions.ADD_SERVICE, payload: service });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully added',
                    timeout: 5000
                });
            });
    }

}
