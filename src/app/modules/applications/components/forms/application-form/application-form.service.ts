import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import { CustomValidatorsService } from '@app/core/custom-validators.service';
import { Application, ModelVersion } from '@app/core/data/types';
import {
  ModelVariantFormData,
  ModelVariantFormService,
} from '../model-variant-form/model-variant-form.service';

export interface StageFormData {
  modelVariants: ModelVariantFormData[];
}

interface ExecutionGraphFormData {
  stages: StageFormData[];
}

export interface FormData {
  name?: string;
  executionGraph: ExecutionGraphFormData;
}

@Injectable()
export class ApplicationFormService {
  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modelVariantFormService: ModelVariantFormService,
    private customValidators: CustomValidatorsService,
  ) {}

  public initForm(
    application: Application,
    modelVersions: ModelVersion[] = [],
  ): FormGroup {
    let data: FormData;

    if (application) {
      data = this.applicationToFormData(application, modelVersions);
    } else {
      data = this.defaultFormData();
    }
    this.form = this.fb.group({
      applicationName: this.fb.control(data.name, [
        this.customValidators.required(),
        this.customValidators.uniqNameValidation(data.name),
        this.customValidators.applicationNameformat(),
        this.customValidators.lengthValidation(128),
      ]),
      kafkaStreaming: this.fb.array([]),
      stages: this.fb.array(this.getStagesArray(data.executionGraph.stages)),
    });

    return this.form;
  }

  public applicationToFormData(
    application: Application,
    modelVersions: ModelVersion[],
  ): FormData {
    const stages = application.executionGraph.stages.map(stage => {
      const modelVariants: ModelVariantFormData[] = stage.modelVariants.map(
        mv =>
          this.modelVariantFormService.modelVariantToModelVariantFormData(
            mv,
            modelVersions,
          ),
        this.modelVariantFormService,
      );
      return { ...stage, modelVariants };
    });

    return {
      name: application.name,
      executionGraph: {
        stages,
      },
    };
  }

  public get stages(): FormArray {
    return this.form.get('stages') as FormArray;
  }

  public addStageControl(stage = this.defaultStageData()): void {
    this.stages.push(this.buildStageGroup(stage));
  }

  public addModelVariantToStage(stageControl: AbstractControl): void {
    const modelVariants = stageControl.get('modelVariants') as FormArray;
    modelVariants.push(
      this.modelVariantFormService.buildModelVariantFormGroup(),
    );
  }

  private buildStageGroup(stage): FormGroup {
    const modelVariants = stage.modelVariants.map(
      (modelVariant: ModelVariantFormData) => {
        return this.modelVariantFormService.buildModelVariantFormGroup(
          modelVariant,
        );
      },
    );

    return this.fb.group({
      modelVariants: this.fb.array(
        modelVariants,
        this.customValidators.weightValidation(),
      ),
    });
  }

  private getStagesArray(stages: any[] = []): FormGroup[] {
    return stages.map(stage => this.buildStageGroup(stage));
  }

  private defaultStageData(): StageFormData {
    return {
      modelVariants: [
        this.modelVariantFormService.defaultModelVariantFormData(),
      ],
    };
  }

  private defaultFormData(): FormData {
    return {
      name: '',
      executionGraph: {
        stages: [this.defaultStageData()],
      },
    };
  }
}
