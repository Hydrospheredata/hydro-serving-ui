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
  TimeIntervalSelectComponent,
} from '@monitoring/components';
import { reducer, MonitoringServiceStatusEffects } from '@monitoring/store';
import { MonitoringPageEffects } from '@monitoring/store/effects/monitoring-page.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { HsD3Module } from '../hs-d3/hs-d3.module';
import { ChartComponent } from './components/chart/chart.component';
import {
  MonitoringAvailabilityComponent,
  MetricsComponent,
  MonitoringPageComponent,
  ChartsComponent,
  ReqResLogsComponent,
} from './containers';
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
    TimeIntervalSelectComponent,
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
    EffectsModule.forFeature([
      MonitoringServiceStatusEffects,
      MonitoringPageEffects,
    ]),
  ],
  exports: [MonitoringPageComponent, MetricsComponent],
})
export class MonitoringModule {}
