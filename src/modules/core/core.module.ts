import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';

import { NavbarComponent, LoaderComponent } from './_index';

import { CodemirrorModule } from 'ng2-codemirror';
// import { ClipboardModule } from 'ngx-clipboard';
import { EffectsModule } from '@ngrx/effects';

// Services
import {
    HttpService,
    LoaderStateService,
    FormsService,
    ApplicationsService,
    ModelsService,
    EnvironmentsService,
    ContractsService,
    RuntimesService,
    SourcesService,
} from '@shared/services/_index';

// Effects
import {
    ApplicationsEffects,
    ModelEffects,
    RuntimesEffects,
    ContractsEffects,
    SourcesEffects,
    EnvironmentsEffects,
} from '@shared/effects/_index';

// Builders
import {
    ModelBuilder,
    ModelVersionBuilder,
    ModelBuildBuilder,
    ApplicationBuilder,
    RuntimeBuilder
} from '@shared/builders/_index';

// Factories
import { httpServiceFactory } from '@shared/factories/_index';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
    ModelsReducer,
    ModelBuildsReducer,
    ApplicationsReducer,
    RuntimesReducer,
    ContractsReducer,
    SourcesReducer,
    EnvironmentsReducer,
    ModelVersionsReducer
} from '@shared/reducers/_index';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
        // ClipboardModule,
        HttpModule,
        StoreModule.forRoot({
            models: ModelsReducer,
            applications: ApplicationsReducer,
            modelBuilds: ModelBuildsReducer,
            modelVersions: ModelVersionsReducer,
            runtimes: RuntimesReducer,
            contracts: ContractsReducer,
            sources: SourcesReducer,
            environments: EnvironmentsReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        }),
        EffectsModule.forRoot([
            ApplicationsEffects,
            ModelEffects,
            RuntimesEffects,
            ContractsEffects,
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
        // ClipboardModule,
    ],
    declarations: [
        NavbarComponent,
        LoaderComponent,
    ],
    providers: [
        // Builders
        ModelBuilder,
        ModelVersionBuilder,
        ModelBuildBuilder,
        ApplicationBuilder,
        RuntimeBuilder,
        // Services
        FormsService,
        ApplicationsService,
        ModelsService,
        EnvironmentsService,
        ContractsService,
        RuntimesService,
        SourcesService,
        LoaderStateService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderStateService]
        }
    ]
})
export class CoreModule { }
