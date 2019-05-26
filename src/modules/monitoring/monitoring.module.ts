import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonitoringServiceStatusEffects } from '@monitoring/effects/monitoring-service-status.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { MonitoringPageComponent } from './containers';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    MonitoringPageComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([MonitoringServiceStatusEffects]),
  ],
  exports: [
    MonitoringPageComponent,
  ],
})
export class MonitoringModule { }
