import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DialogAddMetricComponent,
  MetricComponent,
  DialogDeleteMetricComponent,
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
} from './containers';
import { TimemachineComponent } from './containers/timemachine/timemachine.component';
import { reducer } from './reducers';
@NgModule({
  entryComponents: [
    DialogAddMetricComponent,
    DialogDeleteMetricComponent,
  ],
  declarations: [
    MonitoringAvailabilityComponent,
    MonitoringPageComponent,
    MetricsComponent,
    DialogAddMetricComponent,
    DialogDeleteMetricComponent,
    DashboardComponent,
    MetricComponent,
    ChartsComponent,
    ChartComponent,
    TimemachineComponent,
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
    TimemachineComponent,
  ],
})
export class MonitoringModule { }
