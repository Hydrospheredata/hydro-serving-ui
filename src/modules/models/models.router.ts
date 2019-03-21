import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent,
    ProfilerComponent,
    ModelVersionMonitoringComponent,
    CompareComponent,
    ModelVersionMonitoringLogComponent,
    ModelVersionMonitoringContainerComponent
} from '@models/components';
import { ModelDetailsGuard, ModelVersionDetailsGuard } from '@models/services';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'models',
                pathMatch: 'full',
            },
            {
                path: 'models',
                component: ModelsWrapperComponent,
                children: [
                    {
                        path: 'compare',
                        component: CompareComponent,
                    },
                    {
                        path: ':modelId',
                        component: ModelDetailsComponent,
                        data: { anim: 'modelDetail'},
                        canActivate: [ModelDetailsGuard],
                    },
                    {
                        path: ':modelId/:modelVersionId',
                        component: ModelVersionDetailsComponent,
                        data: {anim: 'modelVerDetail'},
                        canActivate: [ModelVersionDetailsGuard],
                    },
                    {
                        path: ':modelId/:modelVersionId/profiler',
                        component: ProfilerComponent,
                        data: {anim: 'modelVerDetail'},
                        canActivate: [ModelVersionDetailsGuard],
                    },
                    {
                        path: ':modelId/:modelVersionId/monitoring',
                        component: ModelVersionMonitoringComponent,
                        data: {anim: 'modelVerDetail'},
                        canActivate: [ModelVersionDetailsGuard],
                    },
                    {
                        path: ':modelId/:modelVersionId/monitoring',
                        component: ModelVersionMonitoringContainerComponent,
                        children: [
                            {
                                path: '',
                                component: ModelVersionMonitoringComponent,
                            },
                            {
                                path: ':metricId',
                                component: ModelVersionMonitoringLogComponent,
                            },
                        ],
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ModelsRoutingModule { }
