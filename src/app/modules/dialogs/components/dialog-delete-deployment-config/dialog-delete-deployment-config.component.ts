import { Component, InjectionToken, Inject } from '@angular/core';

import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { DeploymentConfig } from '@app/core/data/types';

import { DialogsService } from '../../dialogs.service';

export const DEPLOYMENT_CONFIG_TOKEN = new InjectionToken(
  'deployment config name'
);

@Component({
  templateUrl: './dialog-delete-deployment-config.component.html',
  styleUrls: ['./dialog-delete-deployment-config.component.scss'],
})
export class DialogDeleteDeploymentConfigComponent {
  get name(): string {
    return this.config.name;
  }

  constructor(
    public dialog: DialogsService,
    private facade: DeploymentConfigsFacade,
    @Inject(DEPLOYMENT_CONFIG_TOKEN)
    private config: DeploymentConfig
  ) {}

  onDelete() {
    this.facade.delete(this.config.name);
    this.dialog.closeDialog();
  }
}
