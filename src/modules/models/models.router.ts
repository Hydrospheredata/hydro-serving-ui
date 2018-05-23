import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent
} from '@models/components';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'models',
                pathMatch: 'full'
            },
            {
                path: 'models',
                component: ModelsWrapperComponent,
                children: [
                    {
                        path: ':modelId',
                        component: ModelDetailsComponent,
                    },
                    {
                        path: ':modelId/:modelVersionId',
                        component: ModelVersionDetailsComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ModelsRoutingModule { }
