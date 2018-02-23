import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';

import { DialogBase } from './dialog-base';

import { Store } from '@ngrx/store';
import { 
    AppState, 
    // ModelService, 
    Application,
    Runtime, 
    Environment,
    Signature,
    ModelVersion
} from '@shared/models/_index';

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
    // public modelServicesFiltered: ModelService[];

    // public modelVersions: any[] = [];

    public services: Application[];
    public runtimes: Runtime[];
    public environments: Environment[];
    public contracts: Signature[];
    public modelVersions: ModelVersion[];

    public weightsForSlider: any[] = [100];

    private runtimesStoreSub: Subscription;
    private environmentsStoreSub: Subscription;
    private contractsStoreSub: Subscription;
    private modelVersionsStoreSub: Subscription;
    private defaultService: { weight: number, runtime: number, environment: number, modelVersion: number }

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

        // this.modelBuildsStoreSub = this.store.select('modelBuilds')
        //     .subscribe(modelBuilds => {
        //         console.log(modelBuilds);
        //         this.modelBuilds = modelBuilds;
        //     });
        
        this.modelVersionsStoreSub = this.store.select('modelVersions')
            .subscribe(modelVersions => {
                this.modelVersions = modelVersions;
            })

        this.runtimesStoreSub = this.store.select('runtimes')
            .subscribe(runtimes => {
                this.runtimes = runtimes;
            })

        this.environmentsStoreSub = this.store.select('environments')
            .subscribe(environments => {
                this.environments = environments;
            })

        this.contractsStoreSub = this.store.select('contracts')
            .subscribe(contracts => {
                this.contracts = contracts;
            })

        this.defaultService = {
            weight: 100,
            runtime: this.runtimes[0].id,
            environment: this.environments[0].id,
            modelVersion: this.modelVersions[0].id
        }

    }

    public createForm() {
        this.serviceForm = this.fb.group({
            applicationName: [ '', Validators.required ],
            services: this.fb.array([this.addService(this.defaultService)]),
            kafkaStreaming: this.fb.array([this.addKafkaSource()]),
            addModelToService: ''
        });
    }

    public addService(options?) {
        return this.fb.group({
            // selectedModel: [model ? this.modelServicesFiltered.find(item => item.modelRuntime.modelId === model).modelRuntime.modelId : ''],
            // model: [ model ? model : '' ],
            weight: [ this.defaultService.weight, [Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)] ],
            runtime: [ options.runtime ],
            environment: [ options.environment ],
            modelVersion: [ options.modelVersion ]
        });
    }

    public ngOnDestroy() {
        if (this.contractsStoreSub) {
            this.contractsStoreSub.unsubscribe();
        }
        if (this.modelVersionsStoreSub) {
            this.modelVersionsStoreSub.unsubscribe();
        }
        if (this.runtimesStoreSub) {
            this.runtimesStoreSub.unsubscribe();
        }
        if (this.environmentsStoreSub) {
            this.environmentsStoreSub.unsubscribe();
        }
    }

    public addKafkaSource() {
        return this.fb.group({
            sourceTopic: [ '' ],
            destinationTopic: [ '' ]
        });
    }

    public initFormChangesListener() {
        this.serviceForm.valueChanges
            .subscribe(form => {
                console.log(form);
                // let result = 0;
                // // todo fix errors reset
                // this.formErrors.weights = '';
                // this.formErrors.serviceId = '';
                // form.weights.forEach(service => {
                //     result += +service.weight;
                // });

                // if (result != 100) {
                //     this.serviceForm.controls.weights.setErrors({ overflow: true });
                // }

                // if (this.serviceForm.invalid) {
                //     this.formsService.setErrors(this.serviceForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.service);
                // }
            });
    }

    public addModelToService(modelVersion?) {
        const control = <FormArray>this.serviceForm.controls['services'];
        control.push(this.addService(modelVersion));
    }

    public removeModelFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['services'];
        control.removeAt(i);
    }

    public addKafkaToService() {
        const control = <FormArray>this.serviceForm.controls['kafkaStreaming'];
        control.push(this.addKafkaSource());
    }

    public removeKafkaFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['kafkaStreaming'];
        control.removeAt(i);
    }

    // public onSelectModel(value) {
    //     this.modelVersions = this.modelServicesFiltered.filter(item => {
    //         return item.modelRuntime.modelId === value;
    //     });
    // }

    public onAddingModel(modelVersion) {
        this.addModelToService(modelVersion);
        // this.onSelectModel(value);
        this.weightsForSlider.push(0);
        // this.serviceForm.patchValue({
        //     addModelToService: ''
        // });
    }

    public prepareFormDataToSubmit() {

        let services = [];

        this.serviceForm.value.services.forEach(service => {
            // console.log(service);
            services.push(
                {
                    serviceDescription: {
                        runtimeId: service.runtime,
                        modelVersionId: service.modelVersion,
                        environmentId: service.environment
                    },
                    weight: service.weight
                }
            );
        });

        console.log(services);

        // let weights: {runtimeId: number, weight: number}[] = [];
        // let stages: any[] = [];
        // // let kafkaStreaming: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[] = [];

        // if (this.isJsonModeEnabled) {
            
        //     let pipelineEditorValue = JSON.parse(this.pipelineEditorValue.replace(/[\n( )]/g, ''));

        //     // pipelineEditorValue.forEach(stage => {
        //     //     stage.forEach(item => {
        //     //         let modelService = this.modelServicesFiltered.filter(modelService => modelService.serviceName === item.runtimeName).shift();
        //     //         item.runtimeId = modelService.modelRuntime.modelId;
        //     //         delete(item.runtimeName);
        //     //     });
        //     // });
        //     stages = pipelineEditorValue;
        // } else {
        //     data.value.weights.forEach(self => {
        //         weights.push({
        //             runtimeId: self.model.modelRuntime.id,
        //             weight: Number(self.weight)
        //         });
        //     });
        //     stages.push(weights);
        // }

        // data.value.kafkaStreaming.forEach(kafka => {
        //     if (this.isKafkaEnabled) {
        //         kafkaStreaming.push({
        //             serviceId: kafka.serviceId,
        //             sourceTopic: kafka.sourceTopic,
        //             destinationTopic: kafka.destinationTopic,
        //             brokerList: kafka.brokerList instanceof Array ? kafka.brokerList : kafka.brokerList.split(/[#;,\/|()[\]{}<>( )]/g)
        //         });
        //     }
        // });

        return {
            services: services
        };
    }

}
