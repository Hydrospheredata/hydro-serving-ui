import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CustomRouterStateSerializer } from './store/states/router.state';
import { initialState } from './store/states/root.state';

import { reducers } from './store/reducers/root.reducer';

import {
  ModelsEffects,
  ApplicationsEffects,
  ModelVersionsEffects,
  ServablesEffects,
  DeploymentConfigsEffects,
  ServiceStatusesEffects
} from './store/effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { initialState }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      ApplicationsEffects,
      ModelsEffects,
      ModelVersionsEffects,
      ServablesEffects,
      DeploymentConfigsEffects,
      ServiceStatusesEffects
    ]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
})
export class CoreModule {}
