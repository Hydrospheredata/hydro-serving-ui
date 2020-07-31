import { NgModule } from '@angular/core';
import { ChartsModule } from '@charts/charts.module';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { SharedModule } from '@shared/shared.module';
import { VisualizationPageComponent } from './containers';
import {
  VisualizationMetricsComponent,
  VisualizationParamsComponent,
} from './components';
import { VisualizationAvailabilityComponent } from './containers/visualization-availability/visualization-availability.component';

@NgModule({
  imports: [SharedModule, ChartsModule, MonitoringModule],
  declarations: [
    VisualizationPageComponent,
    VisualizationMetricsComponent,
    VisualizationAvailabilityComponent,
    VisualizationParamsComponent,
  ],
})
export class VisualizationModule {}
