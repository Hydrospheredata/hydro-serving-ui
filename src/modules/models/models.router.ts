import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModelDetailsGuard, ModelVersionDetailsGuard } from '@models/services';
import { MonitoringPageComponent } from '@monitoring/containers';
import {
  ModelsPageComponent,
  ModelPageComponent,
  ModelVersionPageComponent,
  ModelVersionProfilerPageComponent,
} from './containers';
import { StatPageComponent } from "../stat/containers";

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
          {
            path: ':modelId/:modelVersionId/profile/:featureName',
            component: ModelVersionProfilerPageComponent,
          },
          {
            path: ':modelId/:modelVersionId/stat',
            component: StatPageComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ModelsRoutingModule {}
