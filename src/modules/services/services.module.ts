import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { ServicesRoutingModule } from './services.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CodemirrorModule } from 'ng2-codemirror';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from '@shared/effects/_index';
import { ServicesReducer, ModelServiceReducer } from '@shared/reducers/_index';




import {
    ServicesWrapperComponent,
    ServicesItemDetailComponent
} from './_index';



@NgModule({
    imports: [
        SharedModule,
        CodemirrorModule,
        CommonModule,
        MdlModule,
        ServicesRoutingModule,
        FormsModule,
        StoreModule.forRoot({ 
            services: ServicesReducer, 
            modelService: ModelServiceReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    declarations: [
        ServicesWrapperComponent,
        ServicesItemDetailComponent
    ]
})
export class ServicesModule { }
