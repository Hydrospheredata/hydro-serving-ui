import { Component, InjectionToken, Inject } from '@angular/core';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import {
  Application,
  DeploymentConfig,
  ModelVersion,
} from '@app/core/data/types';
import { ModelVariantFormService } from '@app/modules/applications/components/forms/model-variant-form/model-variant-form.service';
import { Observable } from 'rxjs';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { applicationToUpdateRequest } from '@app/core/data/utils';

export let SELECTED_UPD_APPLICATION = new InjectionToken<Application>(
  'selectedApplication',
);

@Component({
  templateUrl: './dialog-update-application.component.html',
  providers: [ModelVariantFormService],
})
export class DialogUpdateApplicationComponent {
  modelVersions$: Observable<ModelVersion[]>;
  deploymentConfig$: Observable<DeploymentConfig>;

  constructor(
    @Inject(SELECTED_UPD_APPLICATION)
    public application: Application,
    public facade: ApplicationsFacade,
    public modelVersionsFacade: ModelVersionsFacade,
    private depConfigsFacade: DeploymentConfigsFacade,
    public dialog: DialogsService,
  ) {
    this.modelVersions$ =
      modelVersionsFacade.internalReleasedNonMetricModelVersions();
    this.deploymentConfig$ = depConfigsFacade.defaultDepConfig();
  }

  public onClose(): void {
    this.dialog.closeDialog();
  }

  public onSubmit(formData) {
    formData.id = this.application.id;
    this.facade.editApplication(
      applicationToUpdateRequest(new Application(formData)),
    );
    this.onClose();
  }
}
