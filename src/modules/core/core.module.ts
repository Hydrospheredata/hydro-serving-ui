import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModelBuilder, ModelVersionBuilder } from '@core/builders';
import {
  FormsService,
  NameGenerator,
  SnackbarService,
  SvgSpriteService,
} from '@core/services';
import { BuildInformationService } from '@core/services/build-information.service';
import { CustomRouterStateSerializer, reducers } from '@core/store';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';
import {
  BuildInformationDialogComponent,
  HeaderComponent,
  NavigationComponent,
  PageNotFoundComponent,
} from './components';
import { ChartHelperService } from './services/chart-helper.service';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';
import { HeaderInfoComponent } from './components/header/header-info/header-info.component';
import { TmHeaderComponent } from './components/header/tm-header/tm-header.component';
import { BaseHeaderComponent } from './components/header/base-header/base-header.component';
@NgModule({
  entryComponents: [
    BuildInformationDialogComponent,
    TmHeaderComponent,
    BaseHeaderComponent,
  ],
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
    HeaderNavComponent,
    HeaderInfoComponent,
    TmHeaderComponent,
    BaseHeaderComponent,
  ],
  providers: [
    ModelBuilder,
    ModelVersionBuilder,
    FormsService,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    SvgSpriteService,
    BuildInformationService,
    SnackbarService,
    NameGenerator,
    ChartHelperService,
  ],
})
export class CoreModule {}
