import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModelsRoutingModule } from './models.router';

import {
  ModelsComponent,
  ModelVersionDetailsComponent,
  ModelVersionLogComponent,
  ModelVersionsComponent,
  ModelVersionsRowComponent,
  ModelVersionStatusComponent,
  SignaturesComponent,
} from '@models/components';

import { DialogDeleteModelComponent } from '@models/components/dialogs';
import {
  ModelDetailsGuard,
  ModelsService,
  ModelVersionDetailsGuard,
} from '@models/services';
import { ModelEffects, reducer } from '@models/store';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfilerModule } from '@profiler/profiler.module';
import { ServablesModule } from '@servables/servables.module';
import {
  ModelPageComponent,
  ModelsPageComponent,
  ModelVersionPageComponent,
  ModelVersionProfilerPageComponent,
  ModelVersionServicesComponent,
  ModelVersionDetailsContainerComponent,
} from './containers';
import { ModelsPublicUiModule } from './shared/models-public-ui.module';
import { StatModule } from '../stat/stat.module';
import { ModelVersionHeaderComponent } from './components/model-version-header/model-version-header.component';

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
    ModelVersionHeaderComponent,
    ModelVersionDetailsContainerComponent,
  ],
  entryComponents: [DialogDeleteModelComponent, ModelVersionLogComponent],
  providers: [ModelsService, ModelDetailsGuard, ModelVersionDetailsGuard],
  exports: [ModelsPageComponent, ModelVersionHeaderComponent],
})
export class ModelsModule {}
