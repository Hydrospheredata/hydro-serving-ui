import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModelsWrapperComponent } from './_index';
import { ModelsListComponent } from './_index';
import { ModelDetailsComponent } from './_index';


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
