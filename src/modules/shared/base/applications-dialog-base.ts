import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { DialogBase } from './dialog-base';

import { Store } from '@ngrx/store';
import { AppState, ModelService, Application } from '@shared/models/_index';
import { FormsService } from '@shared/services/_index';

import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';



@Injectable()
export class ApplicationsDialogBase extends DialogBase {

    public serviceForm: FormGroup;
    public isKafkaEnabled: boolean = false;
    public isJsonModeEnabled: boolean = false;
    public codeMirrorOptions = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { 
            name: 'javascript', 
            json: true 
        },
        lineWrapping: true,
        readOnly: false,
        scrollbarStyle: 'null'
    };

    public pipelineEditorValue: string = '';

    public selectedService: Application;
    public formTitle: string;
    public formErrors = {
        serviceName: '',
        weights: '',
        serviceId: '',
        modelVersion: '',
        weight: '',
    };
    public modelServicesFiltered: ModelService[];

    public modelVersions: any[] = [];

    public services: Application[];
    public modelVersionsList: any[];

    public weightsForSlider: any[] = [100];

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<AppState>
    ) {
        super(
            dialogRef
        );
        // this.store.select('modelService')
        //     .subscribe(modelService => {
        //         this.modelServicesFiltered = modelService.filter((item, index, self) => {
        //             return item.modelRuntime.runtimeType && item.serviceId > 0 && self.findIndex(t => { return t.modelRuntime.modelId === item.modelRuntime.modelId}) === index;
        //         });
        //     });
        // this.store.select('services')
        //     .subscribe(services => {
        //         this.services = services;
        //     });

        this.store.select('modelBuilds')
            .skip(1)
            .subscribe(modelVersionsList => {
                this.modelVersionsList = modelVersionsList;
            })
    }

    public createServiceForm() {
        this.serviceForm = this.fb.group({
            serviceName: ['', Validators.required],
            weights: this.fb.array([this.addWeightToModel()]),
            // kafkaStreamingSources: this.fb.array([this.addKafkaSource()]),
            addModelToService: ''
        });
    }

    public addWeightToModel(model?) {
        return this.fb.group({
            // selectedModel: [model ? this.modelServicesFiltered.find(item => item.modelRuntime.modelId === model).modelRuntime.modelId : ''],
            model: [model ? model : ''],
            weight: ['100', [Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]]
        });
    }

    // public addKafkaSource() {
    //     return this.fb.group({
    //         serviceId: ['0'],
    //         sourceTopic: [''],
    //         destinationTopic: [''],
    //         brokerList: ['']
    //     });
    // }

    public initFormChangesListener() {
        this.serviceForm.valueChanges.subscribe((form) => {

            let result = 0;
            // todo fix errors reset
            this.formErrors.weights = '';
            this.formErrors.serviceId = '';
            form.weights.forEach(service => {
                result += +service.weight;
            });

            if (result != 100) {
                this.serviceForm.controls.weights.setErrors({ overflow: true });
            }

            if (this.serviceForm.invalid) {
                this.formsService.setErrors(this.serviceForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.service);
            }
        });
    }

    public addModelToService(model?) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.push(this.addWeightToModel(model));
    }

    // public addKafkaToService() {
    //     const control = <FormArray>this.serviceForm.controls['kafkaStreamingSources'];
    //     control.push(this.addKafkaSource());
    // }

    // public removeKafkaFromService(i: number) {
    //     const control = <FormArray>this.serviceForm.controls['kafkaStreamingSources'];
    //     control.removeAt(i);
    // }

    public removeModelFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.removeAt(i);
    }

    // public onSelectModel(value) {
    //     this.modelVersions = this.modelServicesFiltered.filter(item => {
    //         return item.modelRuntime.modelId === value;
    //     });
    // }

    // public onAddingModel(value) {
    //     this.addModelToService(value);
    //     this.onSelectModel(value);
    //     this.weightsForSlider.push(0);
    //     this.serviceForm.patchValue({
    //         addModelToService: ''
    //     });
    // }

    public getFormData(data) {

        let weights: {runtimeId: number, weight: number}[] = [];
        let stages: any[] = [];
        // let kafkaStreamingSources: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[] = [];

        if (this.isJsonModeEnabled) {
            
            let pipelineEditorValue = JSON.parse(this.pipelineEditorValue.replace(/[\n( )]/g, ''));

            // pipelineEditorValue.forEach(stage => {
            //     stage.forEach(item => {
            //         let modelService = this.modelServicesFiltered.filter(modelService => modelService.serviceName === item.runtimeName).shift();
            //         item.runtimeId = modelService.modelRuntime.modelId;
            //         delete(item.runtimeName);
            //     });
            // });
            stages = pipelineEditorValue;
        } else {
            data.value.weights.forEach(self => {
                weights.push({
                    runtimeId: self.model.modelRuntime.id,
                    weight: Number(self.weight)
                });
            });
            stages.push(weights);
        }

        // data.value.kafkaStreamingSources.forEach(kafka => {
        //     if (this.isKafkaEnabled) {
        //         kafkaStreamingSources.push({
        //             serviceId: kafka.serviceId,
        //             sourceTopic: kafka.sourceTopic,
        //             destinationTopic: kafka.destinationTopic,
        //             brokerList: kafka.brokerList instanceof Array ? kafka.brokerList : kafka.brokerList.split(/[#;,\/|()[\]{}<>( )]/g)
        //         });
        //     }
        // });

        return {
            stages: stages,
            // kafkaStreamingSources: kafkaStreamingSources
        };
    }

}
