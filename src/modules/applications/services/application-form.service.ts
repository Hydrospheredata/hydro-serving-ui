import { Injectable, OnDestroy } from "@angular/core";
import { 
    FormArray,
    FormBuilder,
    FormGroup,
    FormControl
} from "@angular/forms";
import {
    Model,
    Runtime,
} from "@shared/_index";
import { HydroServingState } from "@core/reducers";
import { Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { getAllModels, getModelVersionsByModelId } from "@models/reducers";
import { CustomValidatorsService } from "@core/services/custom-validators.service";


interface Service {
    weight: number;
    environment: any;
    runtime: any;
    modelVersion: any;
}

interface Stage {
    services: Service[]
}

interface ExecutionGraph {
    stages: Stage[]
}

interface FormData {
    name?: string;
    executionGraph: ExecutionGraph;
}

@Injectable()
export class ApplicationFormService implements OnDestroy {
    private models: Model[];
    private modelsSub: Subscription;
    private runtimes: Runtime[];
    private runtimesSub: Subscription;

    private _form: FormGroup;

    public initForm(data: FormData = this.defaultFormData()): FormGroup {
        this._form = this.fb.group({
            applicationName: this.buildApplicationNameControl(data.name),
            kafkaStreaming: this.fb.array([]),
            stages: this.fb.array(this.getStagesArray(data.executionGraph.stages))
        })

        return this._form;
    }

    constructor(
        private fb: FormBuilder,
        private store: Store<HydroServingState>,
        private customValidators: CustomValidatorsService
    ) {
        this.runtimesSub = store.select('runtimes').subscribe(
            runtimes => this.runtimes = runtimes
        );

        this.modelsSub = store.select(getAllModels).subscribe(
            models => this.models = models
        )
    }

    public get stages(): FormArray {
        return this._form.get('stages') as FormArray
    }

    public addStageControl(stage = this.defaultStageData()): void {
        this.stages.push(this.buildStageGroup(stage));
    }

    public addServiceToStage(stageControl: FormGroup){
        let services = stageControl.get('services') as FormArray
        services.push(this.buildServiceGroup())
    }

    private buildApplicationNameControl(applicationName: string = ''){
        return [applicationName, [this.customValidators.required(), this.customValidators.uniqNameValidation(applicationName)]]
    }

    private buildStageGroup(stage): FormGroup {
        const services = stage.services.map(
            (service: Service) => this.buildServiceGroup(service)
        )

        return this.fb.group({
            services: this.fb.array(services, this.customValidators.weightValidation())
        })
    }

    private buildServiceGroup(service: Service = this.defaultService()): FormGroup {
         return this.buildServiceForm(service)
    }

    private getStagesArray(stages: Array<any> = []): Array<FormGroup>{
        return stages.map(stage => this.buildStageGroup(stage)) 
    }

    private defaultStageData(): Stage {
        return {
            services: [this.defaultService()]
        }
    }

    private defaultModelId(){
        if(this.models.length){
            return this.models[0].id;
        }
    }

    private defaultModelVersionId(modelId: number){
        if(modelId == undefined){ return };

        let modelVersionId;

        this.store.select(getModelVersionsByModelId(modelId)).subscribe(
            modelVersions => {
                modelVersionId = modelVersions[0].id;
            }
        )

        return modelVersionId;
    }

    private defaultService(): Service {
        const runtimeId = this.defaultRuntimeId();
        const modelId = this.defaultModelId();
        const modelVersionId = this.defaultModelVersionId(modelId);

        return {
            weight: 10,
            environment: {
                id: 0
            },
            runtime: {
                id: runtimeId
            },
            modelVersion: {
                id: modelVersionId,
                model: {
                    id: modelId,
                }
            }
        }
    }

    private defaultFormData(): FormData{
        return {
            name: '',
            executionGraph: {
                stages: [this.defaultStageData()]
            }
        }
    }

    private defaultRuntimeId(){
        if(this.runtimes){
            return this.runtimes[0].id;
        }
    }

    public buildServiceForm(service: Service = this.defaultService()): FormGroup{
        const environment = new FormControl(service.environment && service.environment.id, this.customValidators.required());
        const weight = new FormControl(service.weight, [this.customValidators.required(), this.customValidators.pattern(/^[0-9]+$/)]);
        const runtime = new FormControl(service.runtime && service.runtime.id, this.customValidators.required());
        const signatureName = new FormControl('', [this.customValidators.required(), this.customValidators.pattern(/[a-zA-Z0-9]+/)]);
        const model = new FormGroup({
            modelId: new FormControl(service.modelVersion && service.modelVersion.model.id, this.customValidators.required()),
            modelVersionId: new FormControl(service.modelVersion && service.modelVersion.id, this.customValidators.required())
        })

        return new FormGroup({
            environment,
            weight,
            runtime,
            signatureName,
            model
        })
    }

    ngOnDestroy(){
        this.runtimesSub.unsubscribe();
        this.modelsSub.unsubscribe();
    }
}

