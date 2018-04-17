import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ApplicationsDialogBase } from '@shared/base/_index';
import { ApplicationsService, FormsService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
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
        public applicationsService: ApplicationsService,
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store
        );
        this.data = data;
        // if (this.data.kafkaStreaming.length) {
        //     this.isKafkaEnabled = true;
        // }
        // if (this.selectedService.stages.length > 1) {
        //     this.isJsonModeEnabled = true;
        //     let stagesArr = [];
        //     this.selectedService.stages.forEach(stage => {
        //         let modelsInStageArr = [];
        //         stage.forEach(item => {
        //             modelsInStageArr.push({
        //                 runtimeName: item.service.serviceName,
        //                 weight: item.weight
        //             });
        //         });
        //         stagesArr.push(modelsInStageArr);
        //     });
        //     this.pipelineEditorValue = JSON.stringify(stagesArr, null, 2);
        // }
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
        console.log(application);
        this.applicationsService.updateApplication(application)
            .subscribe(response => {
                console.log(response);
                this.store.dispatch(new Actions.UpdateApplicationSuccessAction(new Application(response)));
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully added',
                    timeout: 5000
                });
            });
    }

}
