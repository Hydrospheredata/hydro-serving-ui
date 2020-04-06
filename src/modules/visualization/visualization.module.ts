import { NgModule } from '@angular/core';
import { ChartsModule } from '@charts/charts.module';
import { MonitoringModule } from '@monitoring/monitoring.module';
import { SharedModule } from '@shared/shared.module';
import { ScatterPlotLegendComponent } from './components';
import { VisualizationPageComponent } from './containers';
import { GradientLegendComponent } from './components/gradient-legend/gradient-legend.component';

@NgModule({
  imports: [SharedModule, ChartsModule, MonitoringModule],
  declarations: [VisualizationPageComponent, ScatterPlotLegendComponent, GradientLegendComponent],
})
export class VisualizationModule {}
