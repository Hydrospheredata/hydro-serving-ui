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
import {
  MonitoringAvailabilityComponent,
  MetricsComponent,
  MonitoringPageComponent,
  DashboardComponent,
} from './containers';
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
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    MdlModule,
    MdlSelectModule,
    FormsModule,
    ReactiveFormsModule,
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
