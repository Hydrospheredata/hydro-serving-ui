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
    ModelVersionMonitoringContainerComponent,
    ModelVersionContainerComponent
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
                        component: ModelVersionContainerComponent,
                        data: {anim: 'modelVerDetail'},
                        canActivate: [ModelVersionDetailsGuard],
                        children: [
                            {
                                path: '',
                                redirectTo: 'details',
                                pathMatch: 'full',
                            },
                            {
                                path: 'details',
                                component: ModelVersionDetailsComponent,
                            },
                            {
                                path: 'profiler',
                                component: ProfilerComponent,
                                data: {anim: 'modelVerDetail'},
                            },
                            {
                                path: 'monitoring',
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
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ModelsRoutingModule { }
