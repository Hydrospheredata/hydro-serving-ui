import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanActivateModelVersionGuard } from './guards/can-activate-model-version.guard';
import { ModelVersionDetailsComponent } from './containers/model-version-details/model-version-details.component';
import { ModelVersionPageComponent } from './page/model-version-page/model-version-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ModelVersionPageComponent,
        canActivate: [CanActivateModelVersionGuard],
        children: [
          {
            path: '',
            component: ModelVersionDetailsComponent,
          },
          {
            path: 'profile/:featureName',
            loadChildren: '../profiler/profiler.module#ProfilerModule',
          },
          {
            path: 'monitoring',
            loadChildren: '../monitoring/monitoring.module#MonitoringModule',
          },
          {
            path: 'data_projection',
            loadChildren:
              '../visualization/visualization.module#VisualizationModule',
          },
          {
            path: 'drift_report',
            loadChildren: '../stat/stat.module#StatModule',
          },
          // {
          //   path: ':modelVersionId',
          //   component: ModelDetailsComponent,
          //   data: { anim: 'modelDetail' },
          //   // canActivate: [CanActivateModelGuard],
          // },
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
export class ModelVersionRoutingModule {}
