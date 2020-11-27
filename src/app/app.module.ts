import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HydroConfigService } from '@app/core/hydro-config.service';
import { LayoutModule } from '@app/layout/layout.module';
import { HS_BASE_URL, hsBaseUrlFactory } from './core/base-url.token';
import { baseHrefFactory } from './utils';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
import { CoreModule } from './core/core.module';
import { DialogsModule } from './modules/dialogs/dialogs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogsModule,
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
      provide: APP_BASE_HREF,
      useFactory: () => baseHrefFactory(),
    },
    {
      provide: HS_BASE_URL,
      useFactory: href => hsBaseUrlFactory(href),
      deps: [APP_BASE_HREF],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
