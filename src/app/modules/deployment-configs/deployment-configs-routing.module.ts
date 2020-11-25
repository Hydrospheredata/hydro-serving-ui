import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeploymentConfigDetailsComponent } from './containers';
import { DeploymentConfigsPageComponent } from './pages';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeploymentConfigsPageComponent,
        children: [
          {
            path: ':name',
            component: DeploymentConfigDetailsComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeploymentConfigsRoutingModule {}
