import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';

import { DialogBase } from './dialog-base';

import { Store } from '@ngrx/store';
import {
    Application,
    Runtime,
    Environment,
    Signature,
    ModelVersion
} from '@shared/models/_index';

import { HydroServingState } from '@core/reducers';

import { FormsService } from '@core/services';

import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';

import * as fromModel from '@models/reducers';



@Injectable()
export class ApplicationsDialogBase extends DialogBase implements OnDestroy {

    public serviceForm: FormGroup;
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
    public signatures: Signature[];
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
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );

        this.modelVersionsStoreSub = this.store.select(fromModel.getAllModelVersions)
            .subscribe(modelVersions => {
                this.modelVersions = modelVersions;
            });

        this.runtimesStoreSub = this.store.select('runtimes')
            .subscribe(runtimes => {
                this.runtimes = runtimes;
            });

        this.environmentsStoreSub = this.store.select('environments')
            .subscribe(environments => {
                this.environments = environments;
            });

        this.signaturesStoreSub = this.store.select('signatures')
            .subscribe(signatures => {
                this.signatures = signatures;
            });

        this.defaultAppOptions = {
            services: {
                weight: 100,
                runtimeId: this.runtimes && this.runtimes.length > 0 ? this.runtimes[0].id : 0,
                environmentId: this.environments && this.environments.length > 0 ? this.environments[0].id : 0,
                modelVersionId: this.modelVersions && this.modelVersions.length > 0 ? this.modelVersions[0].id : 0,
                signatureName: ''
            },
            kafkaStreaming: {
                sourceTopic: '',
                destinationTopic: ''
            }
        };
    }

    public createForm(data?) {
        this.serviceForm = this.fb.group({
            applicationName: ['', Validators.required],
            applicationNamespace: '',
            kafkaStreaming: this.fb.array([]),
            stages: this.fb.array([]),
        });

        if (data) {
            this.serviceForm.patchValue({
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
        this.serviceForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

    public addStageControl(stage, i?: number) {
        let index: number;
        const control = <FormArray>this.serviceForm.get('stages');
        control.push(this.addStage());
        if (i !== undefined) {
            index = i;
        } else {
            index = control.length - 1;
        }
        if (stage) {
            if (stage.services instanceof Array) {
                stage.services.forEach(service => {
                    this.addServiceControl({ ...service.serviceDescription, weight: service.weight }, index);
                });
            } else {
                this.addServiceControl(stage.services, index);
            }
        }
    }

    public removeStageControl(i: number) {
        const control = <FormArray>this.serviceForm.get('stages');
        control.removeAt(i);
    }

    public addServiceControl(modelVersion, index: number) { // TODO: Fix ModelVersion Type, now returns like number or object
        if (typeof modelVersion === 'number') {
            modelVersion = { modelVersionId: modelVersion };
        }
        const control = <FormArray>this.serviceForm.get(['stages', index]).get('services');
        control.push(this.addService(modelVersion));
    }

    public removeServiceControl(i: number, j: number) {
        const control = <FormArray>this.serviceForm.get(['stages', i]).get('services');
        control.removeAt(j);
    }

    public addKafkaControl(kafkaStreaming) {
        if (!this.isKafkaEnabled) {
            this.isKafkaEnabled = !this.isKafkaEnabled;
        }
        const control = <FormArray>this.serviceForm.get('kafkaStreaming');
        control.push(this.addKafkaSource(kafkaStreaming));
    }

    public removeKafkaControl(i: number) {
        const control = <FormArray>this.serviceForm.get('kafkaStreaming');
        control.removeAt(i);
    }

    public prepareFormDataToSubmit() {
        const stages = [];

        this.serviceForm.value.stages.forEach(stage => {
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

    public onModelVersionSelect(modelVersionId: number) {
        console.log(modelVersionId);
        // this.store.dispatch({ type: Actions.UPDATE_ALL_VERSIONS, payload: modelVersionId });
    }

    private addStage(): FormGroup {
        return this.fb.group({
            services: this.fb.array([])
        });
    }

    private addService(options): FormGroup {
        return this.fb.group({
            weight: [options.weight ? options.weight : 0, this.weightControlValidator],
            runtime: [options.runtimeId ? options.runtimeId : this.defaultAppOptions.services.runtimeId, this.runtimeControlValidator],
            environment: [options.environmentId ? options.environmentId : this.defaultAppOptions.services.environmentId],
            modelVersion: [options.modelVersionId ? options.modelVersionId : this.defaultAppOptions.services.modelVersionId],
            signatureName: [options.signatureName ? options.signatureName : this.defaultAppOptions.services.signatureName,
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
        const control = <FormArray>this.serviceForm.get('stages');
        if (control.length > 1) {
            return [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.text)];
        } else {
            return [Validators.pattern(this.formsService.VALIDATION_PATTERNS.text)];
        }
    }

}
