import { NgModule } from '@angular/core';

import {
  ModelsComponent,
  ModelVersionDetailsComponent,
  ModelVersionLogComponent,
  ModelVersionsComponent,
  ModelVersionsRowComponent,
  ModelVersionStatusComponent,
  SignaturesComponent,
  ModelsHeaderComponent,
} from '@models/components';

import { DialogDeleteModelComponent } from '@models/components/dialogs';
import { ModelsService } from '@models/services';
import { ModelEffects, reducer } from '@models/store';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfilerModule } from '@profiler/profiler.module';
import { ServablesModule } from '@servables/servables.module';
import { SharedModule } from '@shared/shared.module';
import { StatModule } from '../stat/stat.module';
import {
  ModelPageComponent,
  ModelsPageComponent,
  ModelVersionPageComponent,
  ModelVersionProfilerPageComponent,
  ModelVersionServicesComponent,
  ModelVersionDetailsContainerComponent,
} from './containers';
import { ModelsRoutingModule } from './models-routing.module';
import { ModelsPublicUiModule } from './shared/models-public-ui.module';

@NgModule({
  imports: [
    MonitoringModule,
    ModelsPublicUiModule,
    ModelsRoutingModule,
    SharedModule,
    StoreModule.forFeature('models', reducer),
    EffectsModule.forFeature([ModelEffects]),
    ProfilerModule,
    ServablesModule,
    StatModule,
  ],
  declarations: [
    DialogDeleteModelComponent,
    ModelsComponent,
    ModelVersionDetailsComponent,
    ModelVersionLogComponent,
    ModelVersionPageComponent,
    ModelVersionProfilerPageComponent,
    ModelVersionsComponent,
    SignaturesComponent,
    ModelVersionStatusComponent,
    ModelVersionsRowComponent,
    ModelsPageComponent,
    ModelPageComponent,
    ModelVersionServicesComponent,
    ModelVersionDetailsContainerComponent,
    ModelsHeaderComponent,
  ],
  entryComponents: [DialogDeleteModelComponent, ModelVersionLogComponent],
  providers: [ModelsService],
  exports: [ModelsPageComponent],
})
export class ModelsModule {}
