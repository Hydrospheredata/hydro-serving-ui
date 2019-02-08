import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent,
    ProfilerComponent,
    ModelVersionMonitoringComponent
} from '@models/components';
import { ModelDetailsGuard } from '@models/services';

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
                canActivateChild: [ModelDetailsGuard],
                children: [
                    {
                        path: ':modelId',
                        component: ModelDetailsComponent,
                        data: { anim: 'modelDetail'},
                    },
                    {
                        path: ':modelId/:modelVersionId',
                        component: ModelVersionDetailsComponent,
                        data: {anim: 'modelVerDetail'},
                    },
                    {
                        path: ':modelId/:modelVersionId/profiler',
                        component: ProfilerComponent,
                        data: {anim: 'modelVerDetail'},
                    },
                    {
                        path: ':modelId/:modelVersionId/monitoring',
                        component: ModelVersionMonitoringComponent,
                        data: {anim: 'modelVerDetail'},
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ModelsRoutingModule { }
