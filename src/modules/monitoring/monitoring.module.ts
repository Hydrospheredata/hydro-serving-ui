import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DialogMetricComponent,
  MetricComponent,
  DialogDeleteMetricComponent,
  HealthTimelineComponent,
  HealthTimelineMiniComponent,
  ReqstoreTableLogComponent,
  MetricSpecConfigComponent,
  ReqstoreMetricsComponent,
  InputOutputComponent,
} from '@monitoring/components';
import { MonitoringServiceStatusEffects } from '@monitoring/effects/monitoring-service-status.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { HsD3Module } from '../hs-d3/hs-d3.module';
import { ChartComponent } from './components/chart/chart.component';
import {
  MonitoringAvailabilityComponent,
  MetricsComponent,
  MonitoringPageComponent,
  DashboardComponent,
  ChartsComponent,
  ReqResLogsComponent,
} from './containers';
import { reducer } from './reducers';
@NgModule({
  entryComponents: [
    DialogMetricComponent,
    DialogDeleteMetricComponent,
    MetricsComponent,
  ],
  declarations: [
    MonitoringAvailabilityComponent,
    MonitoringPageComponent,
    MetricsComponent,
    DialogMetricComponent,
    DialogDeleteMetricComponent,
    DashboardComponent,
    MetricComponent,
    ChartsComponent,
    ChartComponent,
    HealthTimelineComponent,
    HealthTimelineMiniComponent,
    ReqstoreTableLogComponent,
    MetricSpecConfigComponent,
    ReqResLogsComponent,
    ReqstoreMetricsComponent,
    InputOutputComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    MdlModule,
    MdlSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HsD3Module,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([MonitoringServiceStatusEffects]),
  ],
  exports: [
    MonitoringPageComponent,
    MetricsComponent,
    DashboardComponent,
  ],
})
export class MonitoringModule { }
