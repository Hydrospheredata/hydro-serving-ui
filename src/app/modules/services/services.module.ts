import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServicesRoutingModule } from "./services.router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServicesReducer, ModelServiceReducer } from '@shared/reducers/_index';




import {
    ServicesWrapperComponent,
    ServicesSidebarComponent,
    ServicesItemDetailComponent
} from "./_index";



@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        CommonModule,
        MdlModule,
        ServicesRoutingModule,
        FormsModule,
        StoreModule.forRoot({ services: ServicesReducer, modelService: ModelServiceReducer }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    declarations: [
        ServicesWrapperComponent,
        ServicesSidebarComponent,
        ServicesItemDetailComponent
    ]
})
export class ServicesModule { }
