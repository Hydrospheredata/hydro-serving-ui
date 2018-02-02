import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ApplicationsDialogBase } from '@shared/base/_index';
import { ApplicationsService, FormsService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, Application } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Application>('selectedService');



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
    @Inject(injectableServiceUpdate) data: Application,
        public store: Store<AppState>,
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public applicationsService: ApplicationsService,
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store
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
                    });
                });
                stagesArr.push(modelsInStageArr);
            });
            this.pipelineEditorValue = JSON.stringify(stagesArr, null, 2);
        }
    }

    ngOnInit() {
        // this.createServiceForm();
        // this.initFormChangesListener();
        // this.updateServiceFormValues(this.selectedService);
    }

    // private updateServiceFormValues(service: Service) {
    //     for (let i = 0; i < service.kafkaStreamingSources.length - 1; i++) {
    //         this.addKafkaToService();
    //     }

    //     if (!this.isJsonModeEnabled) {
    //         for (let i = 0; i < service.stages[0].length - 1; i++) {
    //             this.addModelToService();
    //         }
    //         const weights: any[] = [];

    //         service.stages[0].map(self => {
    //             let selectedModel;
    //             if (self.service) {
    //                 selectedModel = self.service;
    //             } else {
    //                 selectedModel = this.modelServicesFiltered.filter(item => item.serviceId === self.serviceId).shift();
    //             }

    //             weights.push({
    //                 selectedModel: selectedModel.modelRuntime.modelId,
    //                 model: self.service ? self.service : selectedModel,
    //                 weight: self.weight
    //             });
    //             this.weightsForSlider.push(self.weight);
    //             if (self.service) {
    //                 this.onSelectModel(self.service.modelRuntime.modelId);
    //             } else {
    //                 this.onSelectModel(selectedModel.modelRuntime.modelId);
    //             }
    //         });

    //         this.serviceForm.patchValue({
    //             weights: weights
    //         });
    //     }

    //     this.serviceForm.patchValue({
    //         serviceName: service.serviceName,
    //         kafkaStreamingSources: service.kafkaStreamingSources
    //     });
    // }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const data = this.getFormData(this.serviceForm);

        const serviceInfo = {
            id: this.selectedService.id,
            name: this.serviceForm.value.serviceName,
            kafkaStreamingSources: data.kafkaStreamingSources,
        };

        const service = Object.assign( serviceInfo, { stages: data.stages } );

        this.applicationsService.updateApplication(service)
            .subscribe(response => {
                this.store.dispatch({ type: Actions.UPDATE_SERVICE_SUCCESS, payload: new Application(response) });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully added',
                    timeout: 5000
                });
            });

        // this.store.dispatch({ type: Actions.UPDATE_SERVICE, payload: service });
        // this.dialogRef.hide();
        // this.mdlSnackbarService.showSnackbar({
        //     message: 'Service was successfully updated',
        //     timeout: 5000
        // });

    }

}
