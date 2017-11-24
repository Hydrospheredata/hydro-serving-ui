import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { HydroRouter } from '@app/app.router';
import { EffectsModule } from '@ngrx/effects';
import { ClipboardModule } from 'ngx-clipboard';

// codemirror
import { CodemirrorModule } from 'ng2-codemirror';

// Global components
import { AppComponent } from './app.component';

// Modules
import { ServicesModule } from '../modules/services/services.module';
import { ModelsModule } from '../modules/models/models.module';
import { SharedModule } from '../modules/shared/shared.module';

import {
    // Factories
    httpServiceFactory,
    // Services
    HttpModelsService,
    HttpRuntimeTypesService,
    LoaderStateService,
    HttpService,
    HttpModelServiceService,
    BuildModelService,
    // Builders
    ModelBuilder,
    ModelRuntimeBuilder,
    ModelBuildBuilder,
    RuntimeTypeBuilder,
    ModelCurrentServicesBuilder,
    // Components
    LoaderComponent,
    NavbarComponent,
    // Effects
    ServicesEffects, 
    ModelEffects
} from '@shared/_index';

// Dialogs
import * as Dialog from '@components/dialogs/_index';



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoaderComponent,
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogStopModelComponent,
        Dialog.DialogDeployModelComponent,
        Dialog.DialogUpdateServiceComponent,
        Dialog.DialogDeleteServiceComponent,
        Dialog.DialogAddServiceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MdlModule,
        HttpModule,
        HydroRouter,
        MdlSelectModule,
        MomentModule,
        CommonModule,
        CodemirrorModule,
        RouterModule,
        ServicesModule,
        ModelsModule,
        SharedModule,
        ClipboardModule,
        EffectsModule.forRoot([ServicesEffects, ModelEffects])
    ],
    entryComponents: [
        Dialog.DialogModelBuildComponent,
        Dialog.DialogTestComponent,
        Dialog.DialogStopModelComponent,
        Dialog.DialogDeployModelComponent,
        Dialog.DialogUpdateServiceComponent,
        Dialog.DialogDeleteServiceComponent,
        Dialog.DialogAddServiceComponent
    ],
    providers: [
        // services
        HttpModelsService,
        BuildModelService,
        HttpRuntimeTypesService,
        HttpModelServiceService,
        // builders
        ModelBuilder,
        ModelRuntimeBuilder,
        RuntimeTypeBuilder,
        ModelCurrentServicesBuilder,
        ModelBuildBuilder,
        LoaderStateService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
