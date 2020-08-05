import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  DeploymentConfigPageComponent,
  DeploymentConfigsComponent,
} from './containers';
import { DeploymentConfigsRoutingModule } from './deployment-configs-routing.module';

@NgModule({
  declarations: [DeploymentConfigPageComponent, DeploymentConfigsComponent],
  exports: [DeploymentConfigPageComponent],
  imports: [SharedModule, DeploymentConfigsRoutingModule],
})
export class DeploymentConfigModule {}
