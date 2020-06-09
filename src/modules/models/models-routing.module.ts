import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanActivateModelGuard, CanActivateModelVersionGuard } from '@models/guards';

import { MonitoringPageComponent } from '@monitoring/containers';
import { VisualizationPageComponent } from 'modules/visualization/containers';
import { StatPageComponent } from '../stat/containers';
import {
  ModelPageComponent,
  ModelsPageComponent,
  ModelVersionPageComponent,
  ModelVersionProfilerPageComponent,
  ModelVersionDetailsContainerComponent,
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
            canActivate: [CanActivateModelGuard],
          },
          {
            path: ':modelId/:modelVersionId',
            component: ModelVersionPageComponent,
            canActivate: [CanActivateModelVersionGuard],
            children: [
              {
                path: '',
                component: ModelVersionDetailsContainerComponent,
              },
              {
                path: 'monitoring',
                component: MonitoringPageComponent,
              },
              {
                path: 'data_projection',
                component: VisualizationPageComponent,
              },
              {
                path: 'profile/:featureName',
                component: ModelVersionProfilerPageComponent,
              },
              {
                path: 'drift_report',
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
