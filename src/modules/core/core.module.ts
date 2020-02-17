import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModelBuilder, ModelVersionBuilder } from '@core/builders/_index';
import {
  FormsService,
  SvgSpriteService,
  SnackbarService,
  NameGenerator,
} from '@core/services';
import { BuildInformationService } from '@core/services/build-information.service';
import { HttpService } from '@core/services/http';
import { ReqstoreService } from '@core/services/reqstore.service';
import { reducers, CustomRouterStateSerializer } from '@core/store';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';
import {
  HeaderComponent,
  PageNotFoundComponent,
  BuildInformationDialogComponent,
  NavigationComponent,
} from './components';
@NgModule({
  entryComponents: [BuildInformationDialogComponent],
  imports: [
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      initialState: {
        router: {
          state: {
            url: '/',
            params: {},
            queryParams: {},
          },
          navigationId: 0,
        },
      },
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
  ],
  exports: [HeaderComponent, NavigationComponent],
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    BuildInformationDialogComponent,
    NavigationComponent,
  ],
  providers: [
    ModelBuilder,
    ModelVersionBuilder,
    FormsService,
    HttpService,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    SvgSpriteService,
    ReqstoreService,
    BuildInformationService,
    SnackbarService,
    NameGenerator,
  ],
})
export class CoreModule {}
