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
  GraphsComponent,
} from './containers';
import { reducer } from './reducers';
@NgModule({
  entryComponents: [
    DialogMetricComponent,
    DialogDeleteMetricComponent,
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
    GraphsComponent,
    HealthTimelineComponent,
    HealthTimelineMiniComponent,
    ReqstoreTableLogComponent,
    MetricSpecConfigComponent,
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
    GraphsComponent,
  ],
})
export class MonitoringModule { }
