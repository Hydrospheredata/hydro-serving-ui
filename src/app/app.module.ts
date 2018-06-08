import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

// Global components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';

// Modules
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ModelsModule } from '@models/models.module';
import { ApplicationsModule } from '@applications/applications.module';

// Dialogs
import * as Dialog from '@components/dialogs/_index';



@NgModule({
    declarations: [
        AppComponent,
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogUpdateServiceComponent,
        Dialog.DialogDeleteServiceComponent,
        Dialog.DialogAddServiceComponent,
        Dialog.DialogAddMetricComponent,
        Dialog.DialogDeleteMetricComponent,
    ],
    imports: [
        AppRoutingModule,
        RouterModule,
        BrowserModule,
        CoreModule,
        ModelsModule,
        ApplicationsModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        SharedModule,
    ],
    entryComponents: [
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogUpdateServiceComponent,
        Dialog.DialogDeleteServiceComponent,
        Dialog.DialogAddServiceComponent,
        Dialog.DialogAddMetricComponent,
        Dialog.DialogDeleteMetricComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
