import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HydroConfigService } from '@app/core/hydro-config.service';
import { LayoutModule } from '@app/layout/layout.module';
import {
  HS_BASE_URL,
  hsBaseUrlFactory,
  HS_ABSOLUTE_URL,
  hsAbsoluteUrlFactory,
} from './core/base-url.token';
import { baseHrefFactory } from './utils';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
import { CoreModule } from './core/core.module';
import { DialogsModule } from './modules/dialogs/dialogs.module';
import { SharedModule } from '@app/shared/shared.module';
import { ModelVersionLogComponent } from '@app/modules/model-version/components';
import { UiBuildInfoService } from './core/ui-build-info.service';

@NgModule({
  entryComponents: [ModelVersionLogComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogsModule,
    SharedModule,
  ],
  providers: [
    HydroConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (hsCfg: HydroConfigService) => () => hsCfg.loadConfig(),
      deps: [HydroConfigService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (buildInfo: UiBuildInfoService) => () => buildInfo.loadConfig(),
      deps: [UiBuildInfoService],
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: () => baseHrefFactory(),
    },
    {
      provide: HS_BASE_URL,
      useFactory: href => hsBaseUrlFactory(href),
      deps: [APP_BASE_HREF],
    },
    {
      provide: HS_ABSOLUTE_URL,
      useFactory: href => hsAbsoluteUrlFactory(href),
      deps: [APP_BASE_HREF],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
