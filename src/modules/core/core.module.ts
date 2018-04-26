import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';

import { NavbarComponent, LoaderComponent } from './_index';

import { CodemirrorModule } from 'ng2-codemirror';
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
    ElasticService
} from '@shared/services/_index';

// Effects
import {
    ModelEffects,
    RuntimesEffects,
    SignaturesEffects,
    SourcesEffects,
    EnvironmentsEffects,
} from '@shared/effects/_index';

// import {
//     ApplicationsEffects,
// } from '@modules/applications/effects/_index';

// Builders
import {
    ModelBuilder,
    ModelVersionBuilder,
    ModelBuildBuilder,
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
    SignaturesReducer,
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
        HttpModule,
        StoreModule.forRoot({
            models: ModelsReducer,
            applications: ApplicationsReducer,
            modelBuilds: ModelBuildsReducer,
            modelVersions: ModelVersionsReducer,
            runtimes: RuntimesReducer,
            signatures: SignaturesReducer,
            sources: SourcesReducer,
            environments: EnvironmentsReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        }),
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
        ElasticService,
        LoaderStateService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderStateService]
        }
    ]
})
export class CoreModule { }
