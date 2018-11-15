

import { Component, OnDestroy, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Subscription } from 'rxjs';

import { DialogBase } from '@shared/base/dialog-base';
import * as hocon from 'hocon-parser';
import { Store } from '@ngrx/store';
import {
    Application,
    Runtime,
    Environment,
    ModelVersion
} from '@shared/models/_index';

import { HydroServingState } from '@core/reducers';

import { FormsService } from '@core/services';

import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';

import * as fromModel from '@models/reducers';

@Component({
    selector: 'hydro-applications-dialog',
    templateUrl: './applications-dialog.component.html',
    styleUrls: ['./applications-dialog.component.scss']
})
export class ApplicationsDialogComponent extends DialogBase implements OnDestroy, OnInit {
    @Input()
    actionName: string = '';

    @Input()
    applicationData: Application;

    @Output()
    submitEvent = new EventEmitter();

    public applicationForm: FormGroup;
    public isKafkaEnabled = false;
    public isJsonModeEnabled = false;
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

    public pipelineEditorValue = '';

    public formErrors = {
        serviceName: '',
        weights: '',
        serviceId: '',
        modelVersion: '',
        weight: '',
    };

    public services: Application[];
    public runtimes: Runtime[];
    public environments: Environment[];
    public signatures: any;
    public modelVersions: ModelVersion[];

    public weightsForSlider: any[] = [100];

    private runtimesStoreSub: Subscription;
    private environmentsStoreSub: Subscription;
    private signaturesStoreSub: Subscription;
    private modelVersionsStoreSub: Subscription;
    private defaultAppOptions: {
        services: {
            weight: number,
            runtimeId: number,
            environmentId: number,
            modelVersionId: number,
            signatureName: string
        },
        kafkaStreaming: {
            sourceTopic: string,
            destinationTopic: string
        }
    };

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );

        this.modelVersionsStoreSub = this.store.select(fromModel.getAllModelVersions)
            .subscribe(modelVersions => {
                this.modelVersions = modelVersions;
                this.signatures = hocon(modelVersions[0].modelContract).signatures;
            });

        this.runtimesStoreSub = this.store.select('runtimes')
            .subscribe(runtimes => {
                this.runtimes = runtimes;
            });

        this.environments = [
            {
                id: 0,
                name: 'CPU',
                placeholders: []
            },
            {
                id: 1,
                name: 'GPU',
                placeholders: []
            }
        ]

        this.defaultAppOptions = {
            services: {
                weight: 100,
                runtimeId: this.runtimes && this.runtimes.length > 0 ? this.runtimes[0].id : 0,
                environmentId: this.environments && this.environments.length > 0 ? this.environments[0].id : 0,
                modelVersionId: this.modelVersions && this.modelVersions.length > 0 ? this.modelVersions[0].id : 0,
                signatureName: this.signatures ? this.signatures.signature_name : ''
            },
            kafkaStreaming: {
                sourceTopic: '',
                destinationTopic: ''
            }
        };
    }

    ngOnInit(){
        this.createForm(this.applicationData);
        this.initFormChangesListener();
    }

    public createForm(data?: Application) {
        this.applicationForm = this.fb.group({
            applicationName: ['', Validators.required],
            applicationNamespace: '',
            kafkaStreaming: this.fb.array([]),
            stages: this.fb.array([]),
        });

        if (data) {
            this.applicationForm.patchValue({
                applicationName: data.name,
                applicationNamespace: data.namespace,
            });

            if (data.kafkaStreaming.length) {
                data.kafkaStreaming.forEach(kafkaStreaming => {
                    this.addKafkaControl(kafkaStreaming);
                });
            }
            if (data.executionGraph.stages.length) {
                data.executionGraph.stages.forEach((stage, i) => {
                    this.addStageControl(stage, i);
                });
            }

        } else {
            this.addStageControl(this.defaultAppOptions, 0);
        }
    }

    public ngOnDestroy() {
        if (this.signaturesStoreSub) {
            this.signaturesStoreSub.unsubscribe();
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

    public initFormChangesListener() {
        this.applicationForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

    public addStageControl(stage, i?: number) {
        let index: number;
        const control = <FormArray>this.applicationForm.get('stages');
        control.push(this.addStage());
        if (i !== undefined) {
            index = i;
        } else {
            index = control.length - 1;
        }
        if (stage) {
            if (stage.services instanceof Array) {
                stage.services.forEach(service => {
                    this.addServiceControl(service, index);
                });
            } else {
                this.addServiceControl(stage.services, index);
            }
        }
    }

    public removeStageControl(i: number) {
        const control = <FormArray>this.applicationForm.get('stages');
        control.removeAt(i);
    }

    public addServiceByModelVerId(modelVersionId: number, index: number) {
        const service = { 
                modelVersion: { 
                    id: modelVersionId
                }
            };

        this.addServiceControl(service, index);
        }

    public addServiceControl(service: object, index: number) {
        const control = <FormArray>this.applicationForm.get(['stages', index]).get('services');
        control.push(this.addService(service));
    }

    public removeServiceControl(i: number, j: number) {
        const control = <FormArray>this.applicationForm.get(['stages', i]).get('services');
        control.removeAt(j);
    }

    public addKafkaControl(kafkaStreaming) {
        if (!this.isKafkaEnabled) {
            this.isKafkaEnabled = !this.isKafkaEnabled;
        }
        const control = <FormArray>this.applicationForm.get('kafkaStreaming');
        control.push(this.addKafkaSource(kafkaStreaming));
    }

    public removeKafkaControl(i: number) {
        const control = <FormArray>this.applicationForm.get('kafkaStreaming');
        control.removeAt(i);
    }

    public prepareFormDataToSubmit() {
        const stages = [];

        this.applicationForm.value.stages.forEach(stage => {
            const services = [];
            stage.services.forEach(service => {
                services.push(
                    {
                        runtimeId: service.runtime,
                        modelVersionId: service.modelVersion,
                        // environmentId: service.environment,
                        weight: Number(service.weight),
                        signatureName: service.signatureName
                    }
                );
            });
            stages.push({ services: services });
        });

        return stages;
    }

    public toggleKafkaStreaming(event) {
        this.isKafkaEnabled = event.target.checked;
        if (this.isKafkaEnabled) {
            this.addKafkaControl(this.defaultAppOptions.kafkaStreaming);
        } else {
            this.removeKafkaControl(0);
        }
    }

    public onModelVersionSelect(modelVersionId: number, i, j) {
        const control = this.applicationForm.get(['stages', i]).get(['services', j]).get('signatureName');
        control.patchValue(this.getSignature(modelVersionId));
    }

    private addStage(): FormGroup {
        return this.fb.group({
            services: this.fb.array([])
        });
    }

    private getSignature(versionId) {
        const model = this.modelVersions.find(version => version.id === versionId);
        return hocon(model.modelContract).signatures.signature_name;
    }

    private addService(options): FormGroup {
        const {
            weight,
            runtime = {},
            environment = {},
            modelVersion = {}
        } = options;
        const defaultServiceOptions = this.defaultAppOptions.services;

        return this.fb.group({
            weight: [weight || 0, this.weightControlValidator],
            runtime: [runtime.id || defaultServiceOptions.runtimeId, this.runtimeControlValidator],
            environment: [environment.id || defaultServiceOptions.environmentId],
            modelVersion: [modelVersion.id || defaultServiceOptions.modelVersionId],
            signatureName: [options.signatureName || this.getSignature(modelVersion.id || defaultServiceOptions.modelVersionId),
            this.signatureNameControlValidator
            ]
        });
    }

    private addKafkaSource(kafkaStreaming) {
        if (!this.isKafkaEnabled) {
            this.isKafkaEnabled = !this.isKafkaEnabled;
        }
        return this.fb.group({
            sourceTopic: [kafkaStreaming.sourceTopic, Validators.required],
            destinationTopic: [kafkaStreaming.destinationTopic, Validators.required]
        });
    }

    private get weightControlValidator(): ValidatorFn[] {
        return [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)];
    }

    private get runtimeControlValidator(): ValidatorFn[] {
        return [Validators.required];
    }

    private get signatureNameControlValidator(): ValidatorFn[] {
        const control = <FormArray>this.applicationForm.get('stages');
        if (control.length > 1) {
            return [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.text)];
        } else {
            return [Validators.pattern(this.formsService.VALIDATION_PATTERNS.text)];
        }
    }

    public onSubmit(){
        if (this.applicationForm.invalid) {
            return;
        }

        const formData = {
            name: this.applicationForm.value.applicationName,
            kafkaStreaming: this.isKafkaEnabled ? this.applicationForm.value.kafkaStreaming : [],
            executionGraph: {
                stages: this.prepareFormDataToSubmit()
            }
        };
        
        this.submitEvent.emit(formData);
    }
}
