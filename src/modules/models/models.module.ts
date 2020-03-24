import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModelsRoutingModule } from './models.router';

import {
  SignaturesComponent,
  ModelsComponent,
  ModelVersionDetailsComponent,
  ModelVersionLogComponent,
  ModelVersionsComponent,
  ModelVersionStatusComponent,
  ModelVersionsRowComponent,
} from '@models/components';

import {
  DialogDeleteModelComponent,
} from '@models/components/dialogs';
import {
  ModelsService,
  ModelDetailsGuard,
  ModelVersionDetailsGuard,
} from '@models/services';
import { reducer, ModelEffects } from '@models/store';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfilerModule } from '../profiler/profiler.module';
import { ServablesModule } from '../servables/servables.module';
import {
  ModelsPageComponent,
  ModelPageComponent,
  ModelVersionPageComponent,
  ModelVersionProfilerPageComponent,
} from './containers';
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
  ],
  declarations: [
    DialogDeleteModelComponent,
    ModelPageComponent,
    ModelsComponent,
    ModelsPageComponent,
    ModelVersionDetailsComponent,
    ModelVersionLogComponent,
    ModelVersionPageComponent,
    ModelVersionProfilerPageComponent,
    ModelVersionsComponent,
    SignaturesComponent,
    ModelVersionStatusComponent,
    ModelVersionsRowComponent,
  ],
  entryComponents: [DialogDeleteModelComponent, ModelVersionLogComponent],
  providers: [ModelsService, ModelDetailsGuard, ModelVersionDetailsGuard],
  exports: [ModelsPageComponent],
})
export class ModelsModule {

}
