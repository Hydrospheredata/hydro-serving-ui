import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { ServicesService, FormsService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService, Service } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Service>('selectedService');



@Component({
  selector: 'hydro-dialog-update-service',
  templateUrl: './dialog-update-service.component.html',
  styleUrls: ['./dialog-update-service.component.scss'],
  providers: [FormsService]
})
export class DialogUpdateServiceComponent extends DialogBase implements OnInit {

    public dialogType: string = 'Edit';

    public weightsForSlider: any[] = [];

    constructor(
        @Inject(injectableServiceUpdate) data: Service,
        public store: Store<AppState>,
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
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
        this.selectedService = data;
        if (this.selectedService.kafkaStreamingSources.length) {
            this.isKafkaEnabled = true;
        }
    }

    ngOnInit() {
        this.createServiceForm();
        this.initFormChangesListener();
        this.updateServiceFormValues(this.selectedService);
    }

    private updateServiceFormValues(service: Service) {
        for (let i = 0; i < service.kafkaStreamingSources.length - 1; i++) {
            this.addKafkaToService();
        }

        for (let i = 0; i < service.weights.length - 1; i++) {
            this.addModelToService();
        }
        
        let weights: { serviceId: number, weight: number }[] = [];

        service.weights.map(service => {
            weights.push({
                serviceId: service.service ? service.service.serviceId : service.serviceId,
                weight: service.weight
            });
            this.weightsForSlider.push(service.weight);
        });
        
        this.serviceForm.patchValue({
            serviceName: service.serviceName,
            weights: weights,
            kafkaStreamingSources: service.kafkaStreamingSources
        });
    }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const data = this.getFormData(this.serviceForm);

        const serviceInfo = {
            id: this.selectedService.id,
            serviceName: this.serviceForm.value.serviceName,
            kafkaStreamingSources: data.kafkaStreamingSources,
        };

        const service = new Service(Object.assign( serviceInfo, { weights: data.weights } ));

        this.servicesService.updateService(service)
            .subscribe(res => {
                this.store.dispatch({ type: Actions.UPDATE_SERVICE, payload: service });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully updated',
                    timeout: 5000
                });
            });

    }

}
