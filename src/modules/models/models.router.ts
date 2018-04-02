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
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                component: ModelDetailsComponent,
                            },
                            {
                                path: ':modelVersionId',
                                pathMatch: 'full',
                                component: ModelVersionDetailsComponent
                            }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ModelsRoutingModule { }
