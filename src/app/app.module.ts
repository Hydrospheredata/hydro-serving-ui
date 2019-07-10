import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Global components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationsModule } from '@applications/applications.module';
import { CoreModule } from '@core/core.module';
import { DialogModule } from '@dialog/dialog.module';
import { ModelsModule } from '@models/models.module';
import { SharedModule } from '@shared/shared.module';
import { MonitoringModule } from 'modules/monitoring/monitoring.module';
import { RootCauseModule } from 'modules/root-cause/root-cause.module';
import { ServablesModule } from 'modules/servables/servables.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ModelsModule,
    ApplicationsModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    SharedModule,
    DialogModule,
    MonitoringModule,
    RootCauseModule,
    ServablesModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
