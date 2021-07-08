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

import { merge, Observable, of } from 'rxjs';
import { ModelVariantFormService } from './model-variant-form.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';

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

  models$: Observable<Model[]> = this.modelsFacade.modelsWithReleasedVersions();
  modelVersions$: Observable<ModelVersion[]>;
  deploymentConfigs$: Observable<DeploymentConfig[]>;
  selectedModelVersion$: Observable<ModelVersion>;

  get modelControl(): FormControl {
    return this.group.get('modelId') as FormControl;
  }

  get modelVersionControl(): FormControl {
    return this.group.get('modelVersion') as FormControl;
  }

  get weightControl(): FormControl {
    return this.group.get('weight') as FormControl;
  }

  constructor(
    private modelsFacade: ModelsFacade,
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private deploymentConfFacade: DeploymentConfigsFacade,
    @Self() private formService: ModelVariantFormService,
  ) {
    this.deploymentConfigs$ = formService.getDeploymentConfigs();

    this.selectedModelVersion$ = of(undefined);
  }

  ngOnInit() {
    const modelVersions$ = this.modelControl.valueChanges.pipe(
      switchMap((modelId: number) =>
        this.modelVersionsFacade
          .internalReleasedNonMetricModelVersions()
          .pipe(
            map(modelVersions =>
              modelVersions.filter(mv => mv.model.id === modelId),
            ),
          ),
      ),
      tap(mv => this.modelVersionControl.setValue(mv[0])),
    );

    const initialModelVersions$ = of(this.group.value.modelId).pipe(
      switchMap((modelId: number) =>
        this.modelVersionsFacade
          .internalReleasedNonMetricModelVersions()
          .pipe(
            map(modelVersions =>
              modelVersions.filter(mv => mv.model.id === modelId),
            ),
          ),
      ),
    );

    this.modelVersions$ = merge(initialModelVersions$, modelVersions$);
  }

  public onDelete(): void {
    this.delete.emit(this.index);
  }
}
