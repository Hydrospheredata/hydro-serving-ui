import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { extModules } from '../build-specifics';

import { CustomRouterStateSerializer } from './store/states/router.state';
import { initialState } from './store/states/root.state';

import { reducers } from './store/reducers/root.reducer';

import {
  ModelsEffects,
  ApplicationsEffects,
  ModelVersionsEffects,
  ServablesEffects,
  DeploymentConfigsEffects,
  ServiceStatusesEffects,
} from './store/effects';
import { NotificationEffects } from './store/effects/notifications.effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { initialState }),
    extModules,
    EffectsModule.forRoot([
      ApplicationsEffects,
      ModelsEffects,
      ModelVersionsEffects,
      ServablesEffects,
      DeploymentConfigsEffects,
      ServiceStatusesEffects,
      NotificationEffects,
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
