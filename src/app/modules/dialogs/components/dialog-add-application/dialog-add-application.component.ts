import { Component, ViewChild } from '@angular/core';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';

import { DialogsService } from '../../dialogs.service';
import { ApplicationFormComponent } from '@app/modules/applications/components/forms';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { Observable } from 'rxjs';
import { DeploymentConfig, ModelVersion } from '@app/core/data/types';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';

@Component({
  templateUrl: './dialog-add-application.component.html',
})
export class DialogAddApplicationComponent {
  @ViewChild('applicationForm', { static: true })
  ApplicationFormComponent: ApplicationFormComponent;

  modelVersions$: Observable<ModelVersion[]>;
  deploymentConfig$: Observable<DeploymentConfig>;

  constructor(
    private dialog: DialogsService,
    private facade: ApplicationsFacade,
    private modelVersionsFacade: ModelVersionsFacade,
    private depConfigsFacade: DeploymentConfigsFacade,
  ) {
    this.modelVersions$ =
      modelVersionsFacade.internalReleasedNonMetricModelVersions();
    this.deploymentConfig$ = depConfigsFacade.defaultDepConfig();
  }

  public onClose(): void {
    this.dialog.closeDialog();
  }

  public onSubmit(data): void {
    this.facade.addApplication(data);
    this.onClose();
  }
}
