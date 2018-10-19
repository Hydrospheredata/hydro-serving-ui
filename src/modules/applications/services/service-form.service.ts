import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { HydroServingState } from "@core/reducers";
import { getAllModelVersions, getModelVersionsByModelId, getAllModels } from "@models/reducers";
import * as hocon from 'hocon-parser';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ModelVersion, Model, Runtime } from "@shared/_index";
import { FormControl, FormGroup } from "@angular/forms";
import { CustomValidatorsService } from "@core/services/custom-validators.service";




interface Service {
    weight: number;
    environment: any;
    runtime: any;
    modelVersion: any;
    signatureName: string;
}

@Injectable()
export class ServiceFormService implements OnDestroy {
    private allModelVersions;
    private allModelVersionsSub: Subscription;
    private modelVersions = new BehaviorSubject<any[]>([]);
    private models: Model[];
    private modelsSub: Subscription;
    private runtimes: Runtime[];
    private runtimesSub: Subscription;

    public getSignature(versionId): string {
        const modelVersion = this.allModelVersions.find(version => version.id === versionId);
        return hocon(modelVersion.modelContract).signatures.signature_name;
    }

    constructor(
        private store: Store<HydroServingState>,
        private customValidators: CustomValidatorsService
    ){
        this.allModelVersionsSub = this.store.select(getAllModelVersions).subscribe(
            allModelVersions => this.allModelVersions = allModelVersions
        );

        this.runtimesSub = store.select('runtimes').subscribe(
            runtimes => this.runtimes = runtimes
        );

        this.modelsSub = store.select(getAllModels).subscribe(
            models => this.models = models
        )
    }

    public getModelVersions(): Observable<any> {
        return this.modelVersions.asObservable();
    }

    public updateModelVersionList(modelId: number) : void {
        this.store.select(getModelVersionsByModelId(modelId)).take(1).subscribe(
            modelVersions => {
                this.modelVersions.next(modelVersions);
            }
        )
    }

    public getDefaultModelVersion(): ModelVersion {
        const currentModelVersionsArray: Array<ModelVersion> = this.modelVersions.getValue();
        
        if(currentModelVersionsArray.length){
            return currentModelVersionsArray[currentModelVersionsArray.length - 1];
        }
    }

    private defaultRuntimeId(){
        if(this.runtimes){
            return this.runtimes[0].id;
        }
    }

    private defaultModelId(){
        if(this.models.length){
            return this.models[0].id;
        }
    }

    public defaultService(): Service {
        const runtimeId = this.defaultRuntimeId();
        const modelId = this.defaultModelId();
        this.updateModelVersionList(modelId);
        const modelVersion = this.getDefaultModelVersion();
        const signatureName = this.getSignature(modelVersion.id)
        return {
            weight: 100,
            environment: {
                id: 0
            },
            runtime: {
                id: runtimeId
            },
            signatureName,
            modelVersion: {
                id: modelVersion.id,
                model: {
                    id: modelId,
                }
            }
        }
    }

    public buildServiceFormGroup(service: Service = this.defaultService()): FormGroup {
        const environment = new FormControl(service.environment.id, this.customValidators.required());
        const weight = new FormControl(service.weight, [this.customValidators.required(), this.customValidators.pattern(/^[0-9]+$/)]);
        const runtime = new FormControl(service.runtime.id, this.customValidators.required());
        const signatureName = new FormControl(service.signatureName || this.getSignature(service.modelVersion.id), [this.customValidators.required(), this.customValidators.pattern(/[a-zA-Z0-9]+/)]);
        const model = new FormGroup({
            modelId: new FormControl(service.modelVersion.model.id, this.customValidators.required()),
            modelVersionId: new FormControl(service.modelVersion.id, this.customValidators.required())
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
        this.allModelVersionsSub.unsubscribe();
    }
}