import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CustomValidatorsService } from '@app/core/custom-validators.service';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import {
  DeploymentConfig,
  IModelVariant,
  ModelVersion,
  ModelVersionStatus,
} from '@app/core/data/types';

export interface IModelVariantFormData {
  weight: number;
  modelId?: number;
  modelVersion: ModelVersion;
  deploymentConfigName: string;
}

@Injectable()
export class ModelVariantFormService implements OnDestroy {
  private defaultFormData = new BehaviorSubject<IModelVariantFormData>(null);
  private selectedModelId = new Subject<number>();
  private readonly modelVersions$: Observable<ModelVersion[]>;
  private modelVariantFormDataSub: Subscription;

  constructor(
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly modelsFacade: ModelsFacade,
    private readonly depConfigsFacade: DeploymentConfigsFacade,
    private readonly customValidators: CustomValidatorsService
  ) {
    const currentModelId$: Observable<number> = merge(
      this.selectedModelId,
      this.modelsFacade.firstModel().pipe(map(_ => _.id))
    );

    this.modelVersions$ = currentModelId$.pipe(
      switchMap((modelId: number) =>
        this.modelVersionsFacade
          .modelVersionsByModelId(modelId)
          .pipe(
            map(modelVersions =>
              modelVersions.filter(
                mv =>
                  !mv.isExternal && mv.status === ModelVersionStatus.Released
              )
            )
          )
      )
    );

    this.modelVariantFormDataSub = combineLatest([
      this.modelVersions$,
      this.depConfigsFacade.defaultDepConfig(),
    ]).subscribe(([modelVersions, depConfig]) => {
      const nextDefaultFormData: IModelVariantFormData = {
        weight: 100,
        modelId: modelVersions[0].model.id,
        modelVersion: modelVersions[0],
        deploymentConfigName: depConfig.name,
      };

      this.defaultFormData.next(nextDefaultFormData);
    });
  }

  defaultModelVariantFormData(): IModelVariantFormData {
    return this.defaultFormData.getValue();
  }

  modelVariantToModelVariantFormData(
    modelVariant: IModelVariant
  ): IModelVariantFormData {
    return {
      weight: modelVariant.weight,
      modelId: modelVariant.modelVersion.model.id,
      modelVersion: modelVariant.modelVersion,
      deploymentConfigName:
        (modelVariant.deploymentConfiguration &&
          modelVariant.deploymentConfiguration.name) ||
        '',
    };
  }

  buildModelVariantFormGroup(
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
      modelVersion: new FormControl(
        modelVariantFormData.modelVersion,
        this.customValidators.required()
      ),
      deploymentConfigName: new FormControl(
        modelVariantFormData.deploymentConfigName,
        this.customValidators.required()
      ),
    });
  }

  getCurrentModelVersions(): Observable<ModelVersion[]> {
    return this.modelVersions$;
  }

  getDeploymentConfigs(): Observable<DeploymentConfig[]> {
    return this.depConfigsFacade.getAll();
  }

  ngOnDestroy(): void {
    this.modelVariantFormDataSub.unsubscribe();
  }

  selectModelId(modelId: number): void {
    this.selectedModelId.next(modelId);
  }
}
