import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsRoutingModule } from './applications.router';
import { FormsModule } from '@angular/forms';

import { CodemirrorModule } from 'ng2-codemirror';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { 
    ApplicationsReducer, 
    ModelServiceReducer
} from '@shared/_index';

import {
    ApplicationsWrapperComponent,
    ApplicationsItemDetailComponent
} from './_index';

@NgModule({
    imports: [
        SharedModule,
        CodemirrorModule,
        CommonModule,
        MdlModule,
        ApplicationsRoutingModule,
        FormsModule,
        StoreModule.forRoot({ 
            applications: ApplicationsReducer, 
            modelService: ModelServiceReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    declarations: [
        ApplicationsWrapperComponent,
        ApplicationsItemDetailComponent
    ]
})
export class ApplicationsModule { }
