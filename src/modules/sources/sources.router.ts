import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    SourcesWrapperComponent,
    SourcesItemDetailComponent
} from './_index';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'sources',
                component: SourcesWrapperComponent,
                children: [
                    {
                        path: ':id',
                        component: SourcesItemDetailComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class SourcesRoutingModule { }
