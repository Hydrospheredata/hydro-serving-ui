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
          },
          {
            path: ':modelId/:modelVersionId/monitoring',
            component: MonitoringPageComponent,
            canActivate: [CanActivateModelVersionGuard],
          },
          {
            path: ':modelId/:modelVersionId/data_projection',
            component: VisualizationPageComponent,
            canActivate: [CanActivateModelVersionGuard],
          },
          {
            path: ':modelId/:modelVersionId/profile/:featureName',
            component: ModelVersionProfilerPageComponent,
            canActivate: [CanActivateModelVersionGuard],
          },
          {
            path: ':modelId/:modelVersionId/stat',
            component: StatPageComponent,
            canActivate: [CanActivateModelVersionGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class ModelsRoutingModule {}
