import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Global components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';

// Modules
import { ApplicationsModule } from '@applications/applications.module';
import { CoreModule } from '@core/core.module';
import { ModelsModule } from '@models/models.module';
import { ProfilesModule } from '@profiles/profiles.module';
import { SharedModule } from '@shared/shared.module';

// Dialogs
import * as Dialog from '@components/dialogs/_index';

@NgModule({
    declarations: [
        AppComponent,
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogUpdateApplicationComponent,
        Dialog.DialogAddApplicationComponent,
        Dialog.DialogDeleteApplicationComponent,
        Dialog.DialogAddMetricComponent,
        Dialog.DialogDeleteMetricComponent,
        Dialog.DialogUpdateModelVersionComponent,
        Dialog.DialogDeleteModelComponent,
        Dialog.DialogModelsEmptyComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CoreModule,
        ModelsModule,
        ApplicationsModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        SharedModule,
        ProfilesModule,
        AppRoutingModule,
    ],
    entryComponents: [
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogUpdateApplicationComponent,
        Dialog.DialogDeleteApplicationComponent,
        Dialog.DialogAddApplicationComponent,
        Dialog.DialogAddMetricComponent,
        Dialog.DialogDeleteMetricComponent,
        Dialog.DialogUpdateModelVersionComponent,
        Dialog.DialogDeleteModelComponent,
        Dialog.DialogModelsEmptyComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
