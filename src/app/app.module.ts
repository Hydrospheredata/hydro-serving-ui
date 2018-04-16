import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

// Global components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';

// Modules
import { CoreModule } from '@modules/core/core.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ModelsModule } from '@modules/models/models.module';
import { ApplicationsModule } from '@modules/applications/applications.module';
// import { SourcesModule } from '@modules/sources/sources.module';

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
        Dialog.DialogAddSourceComponent
    ],
    imports: [
        AppRoutingModule,
        RouterModule,
        BrowserModule,
        CoreModule,
        ModelsModule,
        ApplicationsModule,
        // SourcesModule,
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
        Dialog.DialogAddSourceComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
