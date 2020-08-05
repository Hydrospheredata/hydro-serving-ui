import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeploymentConfigPageComponent } from './containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'deployment_configs',
        component: DeploymentConfigPageComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeploymentConfigsRoutingModule {}
