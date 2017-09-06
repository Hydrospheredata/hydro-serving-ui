import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ModelsWrapperComponent } from "./_index";

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
                component: ModelsWrapperComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]

})
export class ModelsRoutingModule { }