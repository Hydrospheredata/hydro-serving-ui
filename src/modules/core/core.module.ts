import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetricSettingsService } from './services/metrics/metric-settings.service';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { EffectsModule } from '@ngrx/effects';
import { CodemirrorModule } from 'ng2-codemirror';

// Components
import { NavbarComponent, PageNotFoundComponent } from './_index';

// Services
import {
    FormsService,
    EnvironmentsService,
    SignaturesService,
    RuntimesService,
    InfluxDBService,
    SvgSpriteService
} from '@core/services';
import { HttpService } from '@core/services/http';

// Effects
import {
    RuntimesEffects,
    SignaturesEffects,
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
        HttpClientModule,
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
            EnvironmentsEffects,
            MonitoringEffects,
        ]),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
    ],
    exports: [
        NavbarComponent,
        MdlModule,
        MdlSelectModule,
        CodemirrorModule,
    ],
    declarations: [
        NavbarComponent,
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
        InfluxDBService,
        MetricSettingsService,
        MetricsService,
        HttpService,
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        SvgSpriteService,
    ],
})
export class CoreModule { }
