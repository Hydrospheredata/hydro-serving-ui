import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { RedirectToServicesGuard } from '@shared/_index';

import { ServicesWrapperComponent, ServicesItemDetailComponent } from "./_index";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'services',
                component: ServicesWrapperComponent,
                children: [
                    {
                        path: ':id',
                        component: ServicesItemDetailComponent,
                        canActivate: [RedirectToServicesGuard]
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
