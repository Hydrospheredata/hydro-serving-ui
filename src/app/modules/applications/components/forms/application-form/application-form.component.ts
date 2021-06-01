import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';

import {Application, ModelVersion} from '@app/core/data/types';
import {
  ApplicationFormService,
  StageFormData,
} from './application-form.service';
import {
  ModelVariantFormData,
  ModelVariantFormService,
} from '../model-variant-form/model-variant-form.service';

@Component({
  selector: 'hs-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  providers: [ModelVariantFormService, ApplicationFormService],
})
export class ApplicationFormComponent implements OnInit {
  @Output() submitHandle: EventEmitter<any> = new EventEmitter();
  @Input() application: Application;
  @Input() modelVersions: ModelVersion[]

  public applicationForm: FormGroup;

  constructor(private formService: ApplicationFormService) {}

  get applicationStagesFormArray() {
    return this.applicationForm.get('stages') as FormArray;
  }

  get kafkaFormArray() {
    return this.applicationForm.get('kafkaStreaming') as FormArray;
  }

  ngOnInit() {
    this.applicationForm = this.formService.initForm(this.application, this.modelVersions);
  }

  public addStageControl() {
    this.formService.addStageControl();
  }

  public addModelVariantToStage(stage: AbstractControl) {
    this.formService.addModelVariantToStage(stage);
  }

  public normalizeStageControlsValue() {
    const stages: StageFormData[] = this.applicationForm.value.stages;

    const toModelVariant = (modelVariant: ModelVariantFormData) => ({
      modelVersionId: modelVariant.modelVersion.id,
      weight: Number(modelVariant.weight),
      deploymentConfigName: modelVariant.deploymentConfigName
        ? modelVariant.deploymentConfigName
        : undefined,
    });

    return stages.map((stage: StageFormData) => ({
      modelVariants: stage.modelVariants.map(toModelVariant),
    }));
  }

  public submit(): void {
    if (this.applicationForm.invalid) {
      this.applicationForm.get('applicationName').markAsDirty();
      return;
    }

    const formData = {
      name: this.applicationForm.value.applicationName,
      kafkaStreaming: this.kafkaFormArray.value || [],
      executionGraph: {
        stages: this.normalizeStageControlsValue(),
      },
    };

    this.submitHandle.emit(formData);
  }

  public showRemoveStageButton(): boolean {
    return this.applicationStagesFormArray.value.length > 1;
  }

  public removeStage(stageIdx: number) {
    this.applicationStagesFormArray.removeAt(stageIdx);
  }

  public showRemoveModelVariantIcon(stage: AbstractControl): boolean {
    return stage.get('modelVariants').value.length > 1;
  }

  public onModelVariantDelete(
    stage: AbstractControl,
    modelVariantIdx: number
  ): void {
    const modelVariants = stage.get('modelVariants') as FormArray;
    modelVariants.removeAt(modelVariantIdx);
  }
}
