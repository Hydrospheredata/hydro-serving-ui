import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModelsRoutingModule } from './models.router';

import {
  ModelsWrapperComponent,
  ModelDetailsComponent,
  ModelVersionsTableComponent,
  ModelVersionDetailsComponent,
  ModelVersionContainerComponent,
  ModelVersionsTableRowComponent,
  ModelVersionProfilerComponent,
  SignaturesComponent,
  ModelVersionReplayComponent,
  ModelVersionDetailsContainerComponent,
  ModelVersionLogComponent,
} from '@models/components';

import { DialogDeleteModelComponent } from '@models/components/dialogs';
import {
  ModelsService,
  ModelDetailsGuard,
  ModelVersionDetailsGuard,
} from '@models/services';
import { reducer, ModelEffects } from '@models/store';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RootCauseModule } from '@rootcause/root-cause.module';
import { ProfilerModule } from '../profiler/profiler.module';
import { ServablesModule } from '../servables/servables.module';

@NgModule({
  imports: [
    ModelsRoutingModule,
    SharedModule,
    StoreModule.forFeature('models', reducer),
    EffectsModule.forFeature([ModelEffects]),
    ProfilerModule,
    MonitoringModule,
    RootCauseModule,
    ServablesModule,
  ],
  declarations: [
    ModelsWrapperComponent,
    ModelDetailsComponent,
    ModelVersionsTableComponent,
    ModelVersionsTableRowComponent,
    ModelVersionDetailsComponent,
    DialogDeleteModelComponent,
    ModelVersionContainerComponent,
    ModelVersionProfilerComponent,
    ModelVersionsTableComponent,
    ModelVersionReplayComponent,
    ModelVersionLogComponent,
    SignaturesComponent,
    ModelVersionDetailsContainerComponent,
  ],
  entryComponents: [DialogDeleteModelComponent, ModelVersionLogComponent],
  providers: [ModelsService, ModelDetailsGuard, ModelVersionDetailsGuard],
})
export class ModelsModule {}
