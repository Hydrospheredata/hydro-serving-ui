import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import { ModelVersionsTagsFacade } from './model-versions-tags.facade';

@Component({
  templateUrl: 'add-comparable.component.html',
})
export class AddComparableComponent {
  modelVersions$: Observable<ModelVersion[]>;
  constructor(
    private dialogService: DialogService,
    private modelsFacade: ModelsFacade,
    private facade: ModelVersionsTagsFacade
  ) {
    this.modelVersions$ = this.modelsFacade.allModelVersions$;
  }

  onSelectModelVersion(modelVersion: ModelVersion): void {
    this.facade.add(modelVersion);
    this.dialogService.closeDialog();
  }
}
