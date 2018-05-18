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
    ModelsService,
    EnvironmentsService,
    SignaturesService,
    RuntimesService,
    SourcesService,
    InfluxDBService
} from '@core/services/_index';

// Effects
import {
    ModelEffects,
    RuntimesEffects,
    SignaturesEffects,
    SourcesEffects,
    EnvironmentsEffects,
} from '@core/effects/_index';

// Builders
import {
    ModelBuilder,
    ModelVersionBuilder,
    ModelBuildBuilder,
    RuntimeBuilder
} from '@core/builders/_index';

// Factories
import { httpServiceFactory } from '@core/factories/_index';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, CustomRouterStateSerializer } from '@core/reducers';
import { RouterStateSerializer } from '@ngrx/router-store';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
        HttpModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([
            ModelEffects,
            RuntimesEffects,
            SignaturesEffects,
            SourcesEffects,
            EnvironmentsEffects
        ])
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
        ModelBuilder,
        ModelVersionBuilder,
        ModelBuildBuilder,
        RuntimeBuilder,
        FormsService,
        ModelsService,
        EnvironmentsService,
        SignaturesService,
        RuntimesService,
        SourcesService,
        InfluxDBService,
        LoaderStateService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderStateService]
        },
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    ]
})
export class CoreModule { }
