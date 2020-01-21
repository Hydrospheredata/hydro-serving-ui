import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ChartComponent } from './components/chart/chart.component';
import { VisualizationComponent } from './containers/visualization/visualization.component';

@NgModule({
  imports: [SharedModule],
  declarations: [VisualizationComponent, ChartComponent],
  exports: [VisualizationComponent],
})
export class VisualizationModule {}
