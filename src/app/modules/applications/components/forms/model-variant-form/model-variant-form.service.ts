import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomValidatorsService } from '@app/core/custom-validators.service';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import {
  DeploymentConfig,
  ModelVariant,
  ModelVersion,
} from '@app/core/data/types';

export interface ModelVariantFormData {
  weight: number;
  modelId?: number;
  modelVersion: ModelVersion;
  deploymentConfigName: string;
}

@Injectable()
export class ModelVariantFormService {
  constructor(
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly modelsFacade: ModelsFacade,
    private readonly depConfigsFacade: DeploymentConfigsFacade,
    private readonly customValidators: CustomValidatorsService,
  ) {}

  defaultModelVariantFormData(
    modelVersions: ModelVersion[],
    depConfig: DeploymentConfig,
  ): ModelVariantFormData {
    return {
      weight: 100,
      modelId: modelVersions[0].model.id,
      modelVersion: modelVersions[0],
      deploymentConfigName: depConfig.name,
    };
  }

  modelVariantToModelVariantFormData(
    modelVariant: ModelVariant,
    modelVersions: ModelVersion[],
  ): ModelVariantFormData {
    const modelVersion = modelVersions.find(
      mv => mv.id === modelVariant.modelVersionId,
    );

    return {
      weight: modelVariant.weight,
      modelId: modelVersion.model.id,
      modelVersion: modelVersion,
      deploymentConfigName: modelVariant.deploymentConfigurationName,
    };
  }

  buildModelVariantFormGroup(
    modelVariantFormData: ModelVariantFormData = this.defaultModelVariantFormData(
      [],
      null,
    ),
  ): FormGroup {
    return new FormGroup({
      weight: new FormControl(modelVariantFormData.weight, [
        this.customValidators.required(),
        this.customValidators.pattern(/^[0-9]+$/),
      ]),
      modelId: new FormControl(
        modelVariantFormData.modelId,
        this.customValidators.required(),
      ),
      modelVersion: new FormControl(
        modelVariantFormData.modelVersion,
        this.customValidators.required(),
      ),
      deploymentConfigName: new FormControl(
        modelVariantFormData.deploymentConfigName,
        this.customValidators.required(),
      ),
    });
  }

  getDeploymentConfigs(): Observable<DeploymentConfig[]> {
    return this.depConfigsFacade.getAll();
  }
}
