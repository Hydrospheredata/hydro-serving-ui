import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent
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
                    },
                    {
                        path: ':modelId/:modelVersionId',
                        component: ModelVersionDetailsComponent,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ModelsRoutingModule { }
