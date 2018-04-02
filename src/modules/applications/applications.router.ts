import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ApplicationsWrapperComponent,
    ApplicationsItemDetailComponent
} from './_index';

@NgModule({
    imports: [
    RouterModule.forChild([
            {
                path: 'applications',
                component: ApplicationsWrapperComponent,
                children: [
                    {
                        path: ':id',
                        component: ApplicationsItemDetailComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
