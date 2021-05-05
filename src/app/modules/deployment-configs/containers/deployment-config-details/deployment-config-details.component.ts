import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { DeploymentConfig } from '@app/core/data/types';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import {
  DEPLOYMENT_CONFIG_TOKEN,
  DialogDeleteDeploymentConfigComponent,
} from '@app/modules/dialogs/components';
import { defaultDepConfig } from '@app/modules/deployment-configs/mocks/depconfig.mock';

@Component({
  selector: 'hs-deployment-config-details',
  templateUrl: './deployment-config-details.component.html',
  styleUrls: ['./deployment-config-details.component.scss'],
})
export class DeploymentConfigDetailsComponent implements OnInit {
  config$: Observable<DeploymentConfig>;
  editMode: boolean;
  defaultDepConfig: string;
  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private readonly dialog: DialogsService
  ) {}

  ngOnInit() {
    this.config$ = this.facade.selectedConfig();
    this.defaultDepConfig = defaultDepConfig;
  }

  removeConfig(config: DeploymentConfig) {
    this.dialog.createDialog({
      component: DialogDeleteDeploymentConfigComponent,
      providers: [{ provide: DEPLOYMENT_CONFIG_TOKEN, useValue: config }],
    });
  }

  onDelete(name: string) {
    this.facade.delete(name);
  }
}
