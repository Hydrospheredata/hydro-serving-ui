import { NgModule } from '@angular/core';
import { ChartsModule } from '@charts/charts.module';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { SharedModule } from '@shared/shared.module';
import { VisualizationPageComponent } from './containers';
import { VisualizationMetricsComponent } from './components';

@NgModule({
  imports: [SharedModule, ChartsModule, MonitoringModule],
  declarations: [VisualizationPageComponent, VisualizationMetricsComponent ],
})
export class VisualizationModule {}
