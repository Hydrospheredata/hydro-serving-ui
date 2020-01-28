import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModelDetailsGuard, ModelVersionDetailsGuard } from '@models/services';
import { MonitoringPageComponent } from '@monitoring/containers';
import {
  ModelsPageComponent,
  ModelPageComponent,
  ModelVersionPageComponent,
} from './containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'models',
        component: ModelsPageComponent,
        children: [
          {
            path: ':modelId',
            component: ModelPageComponent,
            data: { anim: 'modelDetail' },
            canActivate: [ModelDetailsGuard],
          },
          {
            path: ':modelId/:modelVersionId',
            component: ModelVersionPageComponent,
            canActivate: [ModelVersionDetailsGuard],
          },
          {
            path: ':modelId/:modelVersionId/monitoring',
            component: MonitoringPageComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ModelsRoutingModule {}
