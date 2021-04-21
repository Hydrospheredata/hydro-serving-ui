import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

import { CustomValidatorsService } from '@app/core/custom-validators.service';

import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';

import {
  ModelVersion,
  Model,
  IModelVariant,
  ModelVersionStatus, DeploymentConfig,
} from '@app/core/data/types';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';

export interface IModelVariantFormData {
  weight: number;
  modelId?: number;
  modelVersionId: number;
  deploymentConfigName: string;
}

@Injectable()
export class ModelVariantFormService implements OnDestroy {
  private allModelVersions: ModelVersion[];
  private allModelVersionsSub: Subscription;
  private modelVersions = new BehaviorSubject<ModelVersion[]>([]);
  private models: Model[];
  private modelsSub: Subscription;
  private depConfigs: DeploymentConfig[];
  private depConfigsSub: Subscription;

  private currentModelVersion = new BehaviorSubject<ModelVersion>(undefined);

  constructor(
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly modelsFacade: ModelsFacade,
    private readonly depConfigsFacade: DeploymentConfigsFacade,
    private readonly customValidators: CustomValidatorsService
  ) {
    this.allModelVersionsSub = this.modelVersionsFacade
      .allModelVersions()
      .pipe(map(mvs => mvs.filter(mv => !mv.isExternal)))
      .subscribe(
        allModelVersions => (this.allModelVersions = allModelVersions)
      );

    this.modelsSub = this.modelsFacade
      .allModels()
      .subscribe(models => (this.models = models));

    this.depConfigsSub = this.depConfigsFacade
      .getAll()
      .subscribe(depConfigs => this.depConfigs = depConfigs)
  }

  public getModelVersions(): Observable<any> {
    return this.modelVersions.asObservable();
  }

  public updateModelVersionList(modelId: number): void {
    this.modelVersionsFacade
      .modelVersionsByModelId(modelId)
      .pipe(
        take(1),
        map(modelVersions =>
          modelVersions.filter(
            mv => mv.status === ModelVersionStatus.Released || mv.isExternal
          )
        ),
        tap(modelVersions => {
          this.modelVersions.next(modelVersions);
        })
      )
      .subscribe();
  }

  public getDefaultModelVersion(): ModelVersion {
    const currentModelVersionsArray: ModelVersion[] = this.modelVersions
      .getValue()
      .filter(mv => !mv.isExternal);

    if (currentModelVersionsArray.length) {
      return currentModelVersionsArray[0];
    }
  }

  public getDefaultDepConfig(): DeploymentConfig {
    return this.depConfigs.find(depConfig =>
      depConfig.name === 'hydrosphere_manager_default'
    );
  }

  public defaultModelVariantFormData(): IModelVariantFormData {
    const modelId = this.defaultModelId();
    this.updateModelVersionList(modelId);
    const modelVersion = this.getDefaultModelVersion();
    const depConfig = this.getDefaultDepConfig();

    return {
      weight: 100,
      modelId,
      modelVersionId: modelVersion && modelVersion.id,
      deploymentConfigName: depConfig.name
    };
  }

  public modelVariantToModelVariantFormData(
    modelVariant: IModelVariant
  ): IModelVariantFormData {
    return {
      weight: modelVariant.weight,
      modelId: modelVariant.modelVersion.model.id,
      modelVersionId: modelVariant.modelVersion.id,
      deploymentConfigName:
        (modelVariant.deploymentConfiguration &&
          modelVariant.deploymentConfiguration.name) ||
        '',
    };
  }

  public buildModelVariantFormGroup(
    modelVariantFormData: IModelVariantFormData = this.defaultModelVariantFormData()
  ): FormGroup {
    return new FormGroup({
      weight: new FormControl(modelVariantFormData.weight, [
        this.customValidators.required(),
        this.customValidators.pattern(/^[0-9]+$/),
      ]),
      modelId: new FormControl(
        modelVariantFormData.modelId,
        this.customValidators.required()
      ),
      modelVersionId: new FormControl(
        modelVariantFormData.modelVersionId,
        this.customValidators.required()
      ),
      deploymentConfigName: new FormControl(
        modelVariantFormData.deploymentConfigName,
        this.customValidators.required()
      ),
    });
  }

  public getCurrentModelVersion(): Observable<ModelVersion> {
    return this.currentModelVersion.asObservable();
  }

  public setCurrentModelVersion(modelVersionId): void {
    const modelVersion = this.allModelVersions.find(
      mV => mV.id === modelVersionId
    );

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
