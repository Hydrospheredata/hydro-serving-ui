import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ModelsWrapperComponent,
  ModelDetailsComponent,
  ModelVersionDetailsComponent,
  ModelVersionContainerComponent,
  ModelVersionProfilerComponent,
  ModelVersionReplayComponent,
  ModelVersionDetailsContainerComponent,
} from '@models/components';

import { ModelDetailsGuard, ModelVersionDetailsGuard } from '@models/services';
import { MonitoringPageComponent } from '@monitoring/containers';
import { ModelsPageComponent } from './containers/models-page/models-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'models',
        component: ModelsPageComponent,
        children: [
          {
            path: ':modelId',
            component: ModelDetailsComponent,
            data: { anim: 'modelDetail' },
            canActivate: [ModelDetailsGuard],
          },
          {
            path: ':modelId/:modelVersionId',
            component: ModelVersionContainerComponent,
            data: { anim: 'modelVerDetail' },
            canActivate: [ModelVersionDetailsGuard],
            children: [
              {
                path: '',
                redirectTo: 'details',
                pathMatch: 'full',
              },
              {
                path: 'details',
                component: ModelVersionDetailsContainerComponent,
                children: [
                  {
                    path: '',
                    component: ModelVersionDetailsComponent,
                  },
                  {
                    path: 'profile/:featureName',
                    component: ModelVersionProfilerComponent,
                  },
                ],
              },
              {
                path: 'profiler',
                component: ModelVersionProfilerComponent,
                data: { anim: 'modelVerDetail' },
              },
              {
                path: 'monitoring',
                component: MonitoringPageComponent,
              },
              {
                path: 'replay',
                component: ModelVersionReplayComponent,
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
