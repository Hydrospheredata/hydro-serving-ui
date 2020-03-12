import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { CustomMetricService } from '@monitoring/containers/custom-metrics/custom-metrics.service';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'add-comparable.component.html',
})
export class AddComparableComponent {
  modelVersions$: Observable<ModelVersion[]>;

  constructor(
    private dialogService: DialogService,
    private modelsFacade: ModelsFacade,
    private customMetricService: CustomMetricService
  ) {
    this.modelVersions$ = this.modelsFacade.allModelVersions$;
  }

  onSelectModelVersion(id: number): void {
    this.customMetricService.addComparableModelVersion(id);
    this.dialogService.closeDialog();
  }
}
