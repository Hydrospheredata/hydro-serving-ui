import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent,
    ModelVersionMonitoringComponent,
    CompareComponent,
    ModelVersionMonitoringLogComponent,
    ModelVersionMonitoringContainerComponent,
    ModelVersionContainerComponent,
    ReqstoreComponent,
    ModelVersionProfilerComponent
} from '@models/components';

import { ProfilerPageComponent } from '../profiler/containers';

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
                                component: ModelVersionProfilerComponent,
                                data: {anim: 'modelVerDetail'},
                            },
                            {
                                path: 'reqstore',
                                component: ReqstoreComponent,
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
                                        path: 'compare',
                                        component: CompareComponent,
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
