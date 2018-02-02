import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';

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
    ApplicationsReducer,
    BuildsReducer
} from '@shared/reducers/_index';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
        ClipboardModule,
        HttpModule,
        StoreModule.forRoot({
            models: ModelsReducer,
            modelService: ModelServiceReducer,
            modelBuilds: ModelRuntimeReducer,
            applications: ApplicationsReducer,
            builds: BuildsReducer
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
