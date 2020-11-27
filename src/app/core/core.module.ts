import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { HttpClientModule } from '@node_modules/@angular/common/http';
import { StoreModule } from '@node_modules/@ngrx/store';
import { StoreDevtoolsModule } from '@node_modules/@ngrx/store-devtools';

import { CustomRouterStateSerializer } from './store/states/router.state';
import { initialState } from './store/states/root.state';

import { reducers } from './store/reducers/root.reducer';

import {
  ModelsEffects,
  ApplicationsEffects,
  ModelVersionsEffects,
  ServablesEffects,
  DeploymentConfigsEffects,
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
