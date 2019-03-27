import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { HydroServingState } from '@core/reducers';
import { getAllModelVersions, getModelVersionsByModelId, getAllModels } from '@models/reducers';

import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { ModelVersion, Model, IModelVariant } from '@shared/_index';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {take, tap} from 'rxjs/operators';

export interface IModelVariantFormData {
    weight: number;
    modelId?: number;
    modelVersionId: number;
}

@Injectable()
export class ModelVariantFormService implements OnDestroy {
    private allModelVersions: ModelVersion[];
    private allModelVersionsSub: Subscription;
    private modelVersions = new BehaviorSubject<any[]>([]);
    private models: Model[];
    private modelsSub: Subscription;

    private currentModelVersion = new BehaviorSubject<any>({});

    constructor(
        private store: Store<HydroServingState>,
        private customValidators: CustomValidatorsService
    ) {
        this.allModelVersionsSub = this.store.select(getAllModelVersions).subscribe(
            allModelVersions => this.allModelVersions = allModelVersions
        );

        this.modelsSub = store.select(getAllModels).subscribe(
            models => this.models = models
        );
    }

    public getModelVersions(): Observable<any> {
        return this.modelVersions.asObservable();
    }

    public updateModelVersionList(modelId: number): void {
        this.store
            .select(getModelVersionsByModelId(modelId))
            .pipe(
                take(1),
                tap(modelVersions => {
                    this.modelVersions.next(modelVersions);
                })
            ).subscribe();
    }

    public getDefaultModelVersion(): ModelVersion {
        const currentModelVersionsArray: ModelVersion[] = this.modelVersions.getValue();

        if (currentModelVersionsArray.length) {
            return currentModelVersionsArray[currentModelVersionsArray.length - 1];
        }
    }

    public defaultModelVariantFormData(): IModelVariantFormData {
        const modelId = this.defaultModelId();
        this.updateModelVersionList(modelId);
        const modelVersion = this.getDefaultModelVersion();

        return {
            weight: 100,
            modelId,
            modelVersionId: modelVersion && modelVersion.id,
        };
    }

    public modelVariantToModelVariantFormData(modelVariant: IModelVariant): IModelVariantFormData {
        return {
            weight: modelVariant.weight,
            modelId: modelVariant.modelVersion.model.id,
            modelVersionId: modelVariant.modelVersion.id,
        };
    }

    public buildModelVariantFormGroup(
        modelVariantFormData: IModelVariantFormData = this.defaultModelVariantFormData()
    ): FormGroup {
        return new FormGroup({
            weight: new FormControl(
                modelVariantFormData.weight,
                [this.customValidators.required(), this.customValidators.pattern(/^[0-9]+$/)]
            ),
            modelId: new FormControl(
                modelVariantFormData.modelId,
                this.customValidators.required()
            ),
            modelVersionId: new FormControl(
                modelVariantFormData.modelVersionId,
                this.customValidators.required()
            ),
        });
    }

    public getCurrentModelVersion(): Observable<ModelVersion> {
        return this.currentModelVersion.asObservable();
    }

    public setCurrentModelVersion(modelVersionId): void {
        const modelVersion = this.allModelVersions.find(mV => mV.id === modelVersionId);

        if (modelVersion) {
            this.currentModelVersion.next(modelVersion);
        }
    }

    ngOnDestroy() {
        this.modelsSub.unsubscribe();
        this.allModelVersionsSub.unsubscribe();
    }

    private defaultModelId() {
        if (this.models[0]) {
            return this.models[0].id;
        }
    }
}
