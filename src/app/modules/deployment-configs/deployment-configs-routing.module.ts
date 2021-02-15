import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeploymentConfigDetailsComponent } from './containers';
import { DeploymentConfigsPageComponent } from './pages';
import {DcFormComponent} from './components/dc-tree/dc-form/dc-form.component'
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeploymentConfigsPageComponent,
        children: [
          {
            path: 'create',
            component: DcFormComponent
          },
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
