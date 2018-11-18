import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MetricSettingsService } from './services/metrics/metric-settings.service';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
// import { ClipboardModule } from 'ngx-clipboard';
import { EffectsModule } from '@ngrx/effects';
import { CodemirrorModule } from 'ng2-codemirror';

// Components
import { NavbarComponent, LoaderComponent, PageNotFoundComponent } from './_index';

// Services
import {
    HttpService,
    LoaderStateService,
    FormsService,
    EnvironmentsService,
    SignaturesService,
    RuntimesService,
    SourcesService,
    InfluxDBService,
    SvgSpriteService
} from '@core/services';

// Effects
import {
    RuntimesEffects,
    SignaturesEffects,
    SourcesEffects,
    EnvironmentsEffects,
    MonitoringEffects,
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
import { MetricsService } from '@core/services/metrics/metrics.service';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
        HttpModule,
        SharedModule,
        StoreModule.forRoot(reducers,
            {
                initialState: {
                    router: {
                        state: {
                            url: '/',
                            params: {},
                            queryParams: {},
                        },
                        navigationId: 0,
                    },
                },
            }
        ),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([
            RuntimesEffects,
            SignaturesEffects,
            SourcesEffects,
            EnvironmentsEffects,
            MonitoringEffects,
        ]),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
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
        PageNotFoundComponent,
    ],
    providers: [
        ModelBuilder,
        ModelVersionBuilder,
        ModelBuildBuilder,
        RuntimeBuilder,
        FormsService,
        EnvironmentsService,
        SignaturesService,
        RuntimesService,
        SourcesService,
        InfluxDBService,
        MetricSettingsService,
        MetricsService,
        LoaderStateService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderStateService],
        },
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        SvgSpriteService,
    ],
})
export class CoreModule { }
