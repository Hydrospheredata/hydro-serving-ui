import { NgModule } from '@angular/core';
import { ChartsModule } from '@charts/charts.module';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { SharedModule } from '@shared/shared.module';
import { VisualizationPageComponent } from './containers';

@NgModule({
  imports: [SharedModule, ChartsModule, MonitoringModule],
  declarations: [VisualizationPageComponent],
})
export class VisualizationModule {}
