import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';

import { HydroRouter } from '@app/app.router';
import { NavbarComponent, LoaderComponent } from './_index';

import { CodemirrorModule } from 'ng2-codemirror';
import { ClipboardModule } from 'ngx-clipboard';
import { EffectsModule } from '@ngrx/effects';

// Services
import {
    HttpService,
    LoaderStateService,
    FormsService,
    HttpModelServiceService,
    RuntimeTypesService,
    ApplicationsService,
    ModelsService,
    ModelRuntimesService,
    ModelServicesService,
    EnvironmentsService,
    ModelContractService,
} from '@shared/services/_index';

// Effects
import {
    ApplicationsEffects, 
    ModelEffects
} from '@shared/effects/_index';

// Builders
import {
    ModelBuilder,
    // ModelBaseBuilder,
    ModelRuntimeBuilder,
    RuntimeTypeBuilder,
    ModelCurrentServicesBuilder,
    ModelBuildBuilder,
    ServiceBuilder,
} from '@shared/builders/_index';

// Factories
import { httpServiceFactory } from '@shared/factories/_index';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { 
    ModelsReducer, 
    ModelServiceReducer, 
    ModelRuntimeReducer, 
    ApplicationsReducer
} from '@shared/reducers/_index';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
        ClipboardModule,
        HydroRouter,
        HttpModule,
        StoreModule.forRoot({
            models: ModelsReducer,
            modelService: ModelServiceReducer,
            modelBuilds: ModelRuntimeReducer,
            applications: ApplicationsReducer 
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        }),
        EffectsModule.forRoot([ApplicationsEffects, ModelEffects])
    ],
    exports: [
        NavbarComponent, 
        LoaderComponent,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
        ClipboardModule,
        HydroRouter
    ],
    declarations: [
        NavbarComponent, 
        LoaderComponent,
    ],
    providers: [
        // Builders
        ModelBuilder,
        // ModelBaseBuilder,
        ModelRuntimeBuilder,
        RuntimeTypeBuilder,
        ModelCurrentServicesBuilder,
        ModelBuildBuilder,
        ServiceBuilder,
        // Services
        FormsService,
        HttpModelServiceService,
        RuntimeTypesService,
        ApplicationsService,
        ModelRuntimesService,
        ModelsService,
        ModelServicesService,
        EnvironmentsService,
        ModelContractService,
        LoaderStateService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderStateService]
        }
    ]
})
export class CoreModule { }
