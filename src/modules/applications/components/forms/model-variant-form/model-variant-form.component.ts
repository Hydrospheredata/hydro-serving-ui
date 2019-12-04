import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Self,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModelsFacade } from '@models/store';

import { ModelVariantFormService } from '@applications/services';
import { Model, ModelVersion } from '@shared/_index';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  models$: Observable<Model[]> = this.modelsFacade.allModels$;
  modelVersions$: Observable<any>;
  selectedModelVersion$: Observable<ModelVersion>;

  get modelControl(): FormControl {
    return this.group.get('modelId') as FormControl;
  }

  get modelVersionControl(): FormControl {
    return this.group.get('modelVersionId') as FormControl;
  }

  get weightControl(): FormControl {
    return this.group.get('weight') as FormControl;
  }

  constructor(
    private modelsFacade: ModelsFacade,
    @Self() private modelVariantFormService: ModelVariantFormService
  ) {
    this.modelVersions$ = this.modelVariantFormService
      .getModelVersions()
      .pipe(map(mvs => mvs.filter(mv => !mv.isExternal)));
    this.selectedModelVersion$ = this.modelVariantFormService.getCurrentModelVersion();
  }

  ngOnInit() {
    this.modelVariantFormService.updateModelVersionList(
      this.modelControl.value
    );

    this.modelVariantFormService.setCurrentModelVersion(
      this.modelVersionControl.value
    );
    this.subscribeToModelIdChange();
    this.subcribeToModelVersionIdChange();
  }

  public onModelIdChange(modelId): void {
    this.modelVariantFormService.updateModelVersionList(modelId);
    const modelVersion = this.modelVariantFormService.getDefaultModelVersion();
    this.modelVersionControl.setValue(modelVersion ? modelVersion.id : null);
  }

  public onModelVersionChange(modelVersionId: number): void {
    this.modelVariantFormService.setCurrentModelVersion(modelVersionId);
  }

  public onDelete(): void {
    this.delete.emit(this.index);
  }

  private subscribeToModelIdChange(): void {
    this.modelControl.valueChanges.subscribe(modelId => {
      this.onModelIdChange(modelId);
    });
  }

  private subcribeToModelVersionIdChange(): void {
    this.modelVersionControl.valueChanges.subscribe(modelVersionId => {
      this.onModelVersionChange(modelVersionId);
    });
  }
}
