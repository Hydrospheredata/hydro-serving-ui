import { Component, InjectionToken, Inject } from '@angular/core';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { DialogsService } from '../../dialogs.service';

export const DEPLOYMENT_CONFIG_TOKEN = new InjectionToken(
  'deployment config name'
);

@Component({
  templateUrl: './dialog-delete-deployment-config.component.html',
  styleUrls: ['./dialog-delete-deployment-config.component.scss'],
})
export class DialogDeleteDeploymentConfigComponent {
  _name: string;
  constructor(
    private readonly dialogService: DialogsService,
    private facade: DeploymentConfigsFacade,
    @Inject(DEPLOYMENT_CONFIG_TOKEN) name: string
  ) {
    this._name = name;
  }

  get servableName() {
    return this._name;
  }

  onDelete() {
    this.facade.delete(this._name);
    this.onClose();
  }
  onClose() {
    this.dialogService.closeDialog();
  }
}
