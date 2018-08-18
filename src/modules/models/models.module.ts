import { NgModule } from '@angular/core';
import { ModelsRoutingModule } from './models.router';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FormsModule } from '@angular/forms';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent
} from '@models/components';
import { EffectsModule } from '@ngrx/effects';
import { ModelEffects } from '@models/effects';
import { ModelsService, ModelDetailsGuard } from '@models/services';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@models/reducers';
import { ProfilesModule } from '@profiles/profiles.module';



@NgModule({
    imports: [
        ModelsRoutingModule,
        CommonModule,
        SharedModule,
        MomentModule,
        MdlModule,
        MdlSelectModule,
        FormsModule,
        StoreModule.forFeature('models', reducers),
        EffectsModule.forFeature([ModelEffects]),
        ProfilesModule
    ],
    declarations: [
        ModelsWrapperComponent,
        ModelDetailsComponent,
        ModelVersionDetailsComponent
    ],
    providers: [ModelsService, ModelDetailsGuard]
})
export class ModelsModule { }
