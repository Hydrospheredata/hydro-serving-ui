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
    ServicesService,
    ModelsService,
    ModelRuntimesService,
    ModelServicesService,
    EnvironmentsService,
    ModelContractService,
} from '@shared/services/_index';

// Effects
import {
    ServicesEffects, 
    ModelEffects
} from '@shared/effects/_index';

// Builders
import {
    ModelBuilder,
    ModelBaseBuilder,
    ModelRuntimeBuilder,
    RuntimeTypeBuilder,
    ModelCurrentServicesBuilder,
    ModelBuildBuilder,
    ServiceBuilder,
} from '@shared/builders/_index';

// Factories
import { httpServiceFactory } from '@shared/factories/_index';

// Guards
import {
    ServicesGuard
} from '@shared/guards/_index';



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
        EffectsModule.forRoot([ServicesEffects, ModelEffects])
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
        ModelBaseBuilder,
        ModelRuntimeBuilder,
        RuntimeTypeBuilder,
        ModelCurrentServicesBuilder,
        ModelBuildBuilder,
        ServiceBuilder,
        // Guards
        ServicesGuard,
        // Services
        FormsService,
        HttpModelServiceService,
        RuntimeTypesService,
        ServicesService,
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
