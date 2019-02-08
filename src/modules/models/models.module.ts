import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MomentModule } from 'angular2-moment';
import { ModelsRoutingModule } from './models.router';

import {
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionDetailsComponent,
    ProfilerComponent,
    ModelVersionMonitoringComponent,
} from '@models/components';
import {
    DialogDeleteModelComponent,
    DialogAddMetricComponent,
    DialogDeleteMetricComponent
} from '@models/components/dialogs';
import { ModelEffects } from '@models/effects';
import { reducers } from '@models/reducers';
import { ModelsService, ModelDetailsGuard } from '@models/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
        ReactiveFormsModule,
        StoreModule.forFeature('models', reducers),
        EffectsModule.forFeature([ModelEffects]),
        ProfilesModule,
    ],
    declarations: [
        ModelsWrapperComponent,
        ModelDetailsComponent,
        ModelVersionDetailsComponent,
        DialogDeleteModelComponent,
        DialogAddMetricComponent,
        ProfilerComponent,
        ModelVersionMonitoringComponent,
        DialogDeleteMetricComponent,
    ],
    entryComponents: [
        DialogDeleteModelComponent,
        DialogAddMetricComponent,
        DialogDeleteMetricComponent,
    ],
    providers: [ModelsService, ModelDetailsGuard],
})
export class ModelsModule { }
