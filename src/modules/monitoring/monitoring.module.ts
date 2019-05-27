import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonitoringServiceStatusEffects } from '@monitoring/effects/monitoring-service-status.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { MonitoringAvailabilityComponent } from './containers';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    MonitoringAvailabilityComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([MonitoringServiceStatusEffects]),
  ],
  exports: [
    MonitoringAvailabilityComponent,
  ],
})
export class MonitoringModule { }
