import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HydroConfigService } from '@core/services/hydro-config.service';
import { DeploymentConfigModule } from '../modules/deployment-config/deployment-config.module';

// Global controls
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';

// Modules
import { ApplicationsModule } from '@applications/applications.module';
import { CoreModule } from '@core/core.module';
import { DialogModule } from '@dialog/dialog.module';
import { ModelsModule } from '@models/models.module';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { SharedModule } from '@shared/shared.module';
import { VisualizationModule } from 'modules/visualization/visualization.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ApplicationsModule,
    CoreModule,
    DialogModule,
    ModelsModule,
    SharedModule,
    MonitoringModule,
    MonitoringModule,
    VisualizationModule,
    DeploymentConfigModule,
    AppRoutingModule,
  ],
  providers: [
    HydroConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (hsCfg: HydroConfigService) => () => hsCfg.loadConfig(),
      deps: [HydroConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
