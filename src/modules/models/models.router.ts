import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { 
    ModelsWrapperComponent,
    ModelDetailsComponent 
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
        children: [{
        path: ':modelId',
        pathMatch: 'full',
        component: ModelDetailsComponent
        }]
        }
        ])
    ],
    exports: [
    RouterModule
    ]

    })
export class ModelsRoutingModule { }
