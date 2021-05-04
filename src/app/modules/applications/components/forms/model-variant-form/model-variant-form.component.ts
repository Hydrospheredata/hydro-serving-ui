import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Self,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Model, ModelVersion, DeploymentConfig } from '@app/core/data/types';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';

import { Observable, of } from 'rxjs';
import { IModelVariantFormData, ModelVariantFormService } from './model-variant-form.service';

@Component({
  selector: 'hs-model-variant-form',
  templateUrl: './model-variant-form.component.html',
  styleUrls: ['./model-variant-form.component.scss'],
  providers: [ModelVariantFormService],
})
export class ModelVariantFormComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() index: number;
  @Input() showRemoveIcon: boolean = false;

  @Output() delete = new EventEmitter();

  data;
  models$: Observable<Model[]> = this.modelsFacade.allModels();
  modelVersions$: Observable<ModelVersion[]>;
  deploymentConfigs$: Observable<DeploymentConfig[]>;
  selectedModelVersion$: Observable<ModelVersion>;
  currentFormData: IModelVariantFormData;

  get modelControl(): FormControl {
    return this.group.get('modelId') as FormControl;
  }

  get modelVersionControl(): FormControl {
    return this.group.get('modelVersion') as FormControl;
  }

  get weightControl(): FormControl {
    return this.group.get('weight') as FormControl;
  }

  get deploymentConfigNameControl(): FormControl {
    return this.group.get('deploymentConfigName') as FormControl;
  }

  constructor(
    private modelsFacade: ModelsFacade,
    private deploymentConfFacade: DeploymentConfigsFacade,
    @Self() private formService: ModelVariantFormService,
  ) {
    this.modelVersions$ = formService.getCurrentModelVersions();
    this.currentFormData = formService.defaultModelVariantFormData();
    this.deploymentConfigs$ = formService.getDeploymentConfigs();

    this.selectedModelVersion$ = of(undefined);
  }

  ngOnInit() {
    this.onModelIdChange(this.modelControl.value);
    this.subscribeToModelIdChange();
  }

  public onModelIdChange(modelId): void {
    this.formService.selectModelId(modelId);
    const modelVersion = this.formService.defaultModelVariantFormData().modelVersion;
    this.modelVersionControl.setValue(modelVersion || null);
  }

  public onDelete(): void {
    this.delete.emit(this.index);
  }

  private subscribeToModelIdChange(): void {
    this.modelControl.valueChanges.subscribe(modelId => {
      this.onModelIdChange(modelId);
    });
  }
}
