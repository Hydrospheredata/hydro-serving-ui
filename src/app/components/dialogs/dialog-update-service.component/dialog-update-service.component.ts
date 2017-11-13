import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ApplicationsDialogBase } from '@shared/base/_index';
import { ServicesService, FormsService, ModelServicesService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService, Service } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Service>('selectedService');



@Component({
  selector: 'hydro-dialog-update-service',
  templateUrl: './dialog-update-service.component.html',
  styleUrls: ['./dialog-update-service.component.scss'],
  providers: [FormsService]
})
export class DialogUpdateServiceComponent extends ApplicationsDialogBase implements OnInit {

    public dialogType = 'Edit';

    public weightsForSlider: any[] = [];
    public selectedModels: any[] = [];

    constructor(
        @Inject(injectableServiceUpdate) data: Service,
        public store: Store<AppState>,
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public servicesService: ServicesService,
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store,
            servicesService,

        );
        this.selectedService = data;
        if (this.selectedService.kafkaStreamingSources.length) {
            this.isKafkaEnabled = true;
        }
        if (this.selectedService.stages.length > 1) {
            this.isJsonModeEnabled = true;
            let stagesArr = [];
            this.selectedService.stages.forEach(stage => {
                let modelsInStageArr = [];
                stage.forEach(item => {
                    modelsInStageArr.push({
                        runtimeName: item.service.serviceName,
                        weight: item.weight
                    })
                });
                stagesArr.push(modelsInStageArr);
            })
            this.pipelineEditorValue = JSON.stringify(stagesArr, null, 2);
        }
    }

    ngOnInit() {
        this.createServiceForm();
        this.initFormChangesListener();
        this.updateServiceFormValues(this.selectedService);
    }

    private updateServiceFormValues(service: Service) {
        console.log(service);
        for (let i = 0; i < service.kafkaStreamingSources.length - 1; i++) {
            this.addKafkaToService();
        }

        if (!this.isJsonModeEnabled) {
            for (let i = 0; i < service.stages[0].length - 1; i++) {
                this.addModelToService();
            }
            const weights: any[] = [];

            service.stages[0].map(self => {
                let selectedModel;
                if (self.service) {
                    selectedModel = self.service;
                } else {
                    selectedModel = this.modelServicesFiltered.filter(item => item.serviceId === self.serviceId).shift();
                }

                weights.push({
                    selectedModel: selectedModel.modelRuntime.modelId,
                    model: self.service ? self.service : selectedModel,
                    weight: self.weight
                });
                this.weightsForSlider.push(self.weight);
                if (self.service) {
                    this.onSelectModel(self.service.modelRuntime.modelId);
                } else {
                    this.onSelectModel(selectedModel.modelRuntime.modelId);
                }
            });

            console.log(weights);

            this.serviceForm.patchValue({
                weights: weights
            });
        }

        this.serviceForm.patchValue({
            serviceName: service.serviceName,
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

        const service = Object.assign( serviceInfo, { stages: data.stages } );

        console.log(service);

        this.servicesService.updateService(service)
            .subscribe(response => {
                this.store.dispatch({ type: Actions.UPDATE_SERVICE_SUCCESS, payload: new Service(response) });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully added',
                    timeout: 5000
                });
            })

        // this.store.dispatch({ type: Actions.UPDATE_SERVICE, payload: service });
        // this.dialogRef.hide();
        // this.mdlSnackbarService.showSnackbar({
        //     message: 'Service was successfully updated',
        //     timeout: 5000
        // });

    }

}
