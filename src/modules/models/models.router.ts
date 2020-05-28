import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModelDetailsGuard, ModelVersionDetailsGuard } from '@models/services';
import { MonitoringPageComponent } from '@monitoring/containers';
import { VisualizationPageComponent } from 'modules/visualization/containers';
import {
  ModelPageComponent,
  ModelsPageComponent,
  ModelVersionPageComponent,
  ModelVersionProfilerPageComponent,
  ModelVersionDetailsContainerComponent,
} from './containers';
import { StatPageComponent } from '../stat/containers';

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
            children: [
              {
                path: '',
                canActivate: [ModelVersionDetailsGuard],
                component: ModelVersionDetailsContainerComponent,
              },
              {
                path: 'monitoring',
                component: MonitoringPageComponent,
              },
              {
                path: 'visualization',
                component: VisualizationPageComponent,
              },
              {
                path: 'profile/:featureName',
                component: ModelVersionProfilerPageComponent,
              },
              {
                path: 'stat',
                component: StatPageComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ModelsRoutingModule {}
