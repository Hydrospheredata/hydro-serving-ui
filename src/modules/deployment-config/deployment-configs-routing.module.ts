import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeploymentConfigComponent } from './components';
import { DeploymentConfigPageComponent } from './containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'deployment_configs',
        component: DeploymentConfigPageComponent,
        children: [
          {
            path: ':name',
            component: DeploymentConfigComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeploymentConfigsRoutingModule {}
