import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelDetailsComponent } from '@app/modules/models/containers/model-details/model-details.component';
import { ModelsPageComponent } from './page/models-page.component';
import { CanActivateModelGuard } from './guards/can-activate-model.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ModelsPageComponent,
        children: [
          {
            path: ':modelName',
            component: ModelDetailsComponent,
            data: { anim: 'modelDetail' },
            canActivate: [CanActivateModelGuard],
          },
          {
            path: ':modelName/:modelVersionId',
            loadChildren: () =>
              import('../model-version/model-version.module').then(
                m => m.ModelVersionModule
              ),
          },
          // {
          //   path: ':modelId/:modelVersionId',
          //   component: ModelVersionPageComponent,
          //   canActivate: [CanActivateModelVersionGuard],
          //   children: [
          //     {
          //       path: '',
          //       component: ModelVersionDetailsContainerComponent,
          //     },
          //     {
          //       path: 'monitoring',
          //       component: MonitoringPageComponent,
          //     },
          //     {
          //       path: 'data_projection',
          //       component: VisualizationPageComponent,
          //     },
          //     {
          //       path: 'profile/:featureName',
          //       component: ModelVersionProfilerPageComponent,
          //     },
          //     {
          //       path: 'drift_report',
          //       component: StatPageComponent,
          //     },
          //   ],
          // },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ModelsRoutingModule {}
