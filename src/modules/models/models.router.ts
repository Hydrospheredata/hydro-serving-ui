import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent
} from './_index';


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
                        // children: [
                        //     {
                        //         path: '',
                        //         pathMatch: 'full',
                        //         component: ModelDetailsComponent,
                        //     },
                        //     {
                        //         path: ':modelVersionId',
                        //         pathMatch: 'full',
                        //         component: ModelVersionDetailsComponent
                        //     }
                        // ]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ModelsRoutingModule { }
