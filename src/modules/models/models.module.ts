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
    ModelVersionsTableComponent,
    ModelVersionDetailsComponent,
    ModelVersionContainerComponent,
    ModelVersionMonitoringContainerComponent,
    ModelVersionMonitoringComponent,
    ModelVersionMonitoringLogComponent,
    CompareComponent,
    ReqstoreComponent,
    ModelVersionsTableRowComponent,
    ModelVersionProfilerComponent,
} from '@models/components';

import {
    DialogDeleteModelComponent,
    DialogDeleteMetricComponent
} from '@models/components/dialogs';
import { ModelEffects } from '@models/effects';
import { reducers } from '@models/reducers';
import { ModelsService, ModelDetailsGuard, ModelVersionDetailsGuard } from '@models/services';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfilerModule } from '../profiler/profiler.module';

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
        ProfilerModule,
        MonitoringModule,
    ],
    declarations: [
        ModelsWrapperComponent,
        ModelDetailsComponent,
        ModelVersionsTableComponent,
        ModelVersionsTableRowComponent,
        ModelVersionDetailsComponent,
        DialogDeleteModelComponent,
        ModelVersionMonitoringContainerComponent,
        ModelVersionMonitoringComponent,
        DialogDeleteMetricComponent,
        CompareComponent,
        ModelVersionMonitoringLogComponent,
        ModelVersionContainerComponent,
        ReqstoreComponent,
        ModelVersionProfilerComponent,
        ModelVersionsTableComponent,
    ],
    entryComponents: [
        DialogDeleteModelComponent,
        DialogDeleteMetricComponent,
    ],
    providers: [ModelsService, ModelDetailsGuard, ModelVersionDetailsGuard],
})
export class ModelsModule { }
