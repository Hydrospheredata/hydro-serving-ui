import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { 
    ServicesWrapperComponent, 
    ServicesItemDetailComponent 
} from './_index';

@NgModule({
    imports: [
    RouterModule.forChild([
        {
        path: 'applications',
        component: ServicesWrapperComponent,
        children: [
        {
        path: ':id',
        component: ServicesItemDetailComponent
        }
        ]
        }
        ])
    ],
    exports: [
    RouterModule
    ]

    })
export class ServicesRoutingModule { }
