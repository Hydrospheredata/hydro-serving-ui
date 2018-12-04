import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { HydroServingState } from '@core/reducers';
import { getAllModelVersions, getModelVersionsByModelId, getAllModels } from '@models/reducers';

import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { ModelVersion, Model, Runtime } from '@shared/_index';

import * as hocon from 'hocon-parser';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {take} from 'rxjs/operators';

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

    constructor(
        private store: Store<HydroServingState>,
        private customValidators: CustomValidatorsService
    ) {
        this.allModelVersionsSub = this.store.select(getAllModelVersions).subscribe(
            allModelVersions => this.allModelVersions = allModelVersions
        );

        this.runtimesSub = store.select('runtimes').subscribe(
            runtimes => this.runtimes = runtimes
        );

        this.modelsSub = store.select(getAllModels).subscribe(
            models => this.models = models
        );
    }

    public getSignature(modelVersionId: number): string {
        const modelVer = this.allModelVersions.find(version => version.id === modelVersionId);
        try {
            return hocon(modelVer.modelContract).signatures.signature_name;
        } catch (err) {
            console.error(err);
            return '';
        }
    }

    public getModelVersions(): Observable<any> {
        return this.modelVersions.asObservable();
    }

    public updateModelVersionList(modelId: number): void {
        this.store.select(getModelVersionsByModelId(modelId)).pipe(take(1)).subscribe(
            modelVersions => {
                this.modelVersions.next(modelVersions);
            }
        );
    }

    public getDefaultModelVersion(): ModelVersion {
        const currentModelVersionsArray: ModelVersion[] = this.modelVersions.getValue();

        if (currentModelVersionsArray.length) {
            return currentModelVersionsArray[currentModelVersionsArray.length - 1];
        }
    }

    public defaultService(): Service {
        const runtimeId = this.defaultRuntimeId();
        const modelId = this.defaultModelId();
        this.updateModelVersionList(modelId);
        const modelVersion = this.getDefaultModelVersion();
        const signatureName = modelVersion ? this.getSignature(modelVersion.id) : '';

        return {
            weight: 100,
            environment: {
                id: 0,
            },
            runtime: {
                id: runtimeId,
            },
            signatureName,
            modelVersion: {
                id: modelVersion && modelVersion.id,
                model: {
                    id: modelId,
                },
            },
        };
    }

    public buildServiceFormGroup(service: Service = this.defaultService()): FormGroup {
        const environment = new FormControl(service.environment.id, this.customValidators.required());
        const weight = new FormControl(
            service.weight,
            [this.customValidators.required(), this.customValidators.pattern(/^[0-9]+$/)]
        );
        const runtime = new FormControl(service.runtime.id, this.customValidators.required());
        const signatureName = new FormControl(
            service.signatureName || this.getSignature(service.modelVersion && service.modelVersion.id),
            [this.customValidators.required(), this.customValidators.pattern(/[a-zA-Z0-9]+/)]
        );
        const model = new FormGroup({
            modelId: new FormControl(service.modelVersion.model.id, this.customValidators.required()),
            modelVersionId: new FormControl(service.modelVersion.id, this.customValidators.required()),
        });

        return new FormGroup({
            environment,
            weight,
            runtime,
            signatureName,
            model,
        });
    }

    ngOnDestroy() {
        this.runtimesSub.unsubscribe();
        this.modelsSub.unsubscribe();
        this.allModelVersionsSub.unsubscribe();
    }

    private defaultRuntimeId() {
        if (this.runtimes[0]) {
            return this.runtimes[0].id;
        }
    }

    private defaultModelId() {
        if (this.models[0]) {
            return this.models[0].id;
        }
    }
}
