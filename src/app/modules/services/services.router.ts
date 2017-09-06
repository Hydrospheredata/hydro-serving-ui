import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ServicesWrapperComponent, ServicesListComponent } from "./_index";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'services', 
                component: ServicesWrapperComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]

})
export class ServicesRoutingModule { }
