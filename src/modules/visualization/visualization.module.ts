import { NgModule } from '@angular/core';
import { ChartsModule } from '@charts/charts.module';
import { SharedModule } from '@shared/shared.module';
import { VisualizationComponent } from './containers/visualization/visualization.component';

@NgModule({
  imports: [SharedModule, ChartsModule],
  declarations: [VisualizationComponent],
  exports: [VisualizationComponent],
})
export class VisualizationModule {}
