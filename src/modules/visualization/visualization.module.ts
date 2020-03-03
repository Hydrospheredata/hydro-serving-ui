import { NgModule } from '@angular/core';
import { ChartsModule } from '@charts/charts.module';
import { SharedModule } from '@shared/shared.module';
import {
  ColorBySelectorComponent,
  ColorByMetricOptionsComponent,
  ColorByClassLabelOptionsComponent,
} from './components';
import { VisualizationPageComponent } from './containers';

@NgModule({
  imports: [SharedModule, ChartsModule],
  declarations: [
    VisualizationPageComponent,
    ColorBySelectorComponent,
    ColorByMetricOptionsComponent,
    ColorByClassLabelOptionsComponent,
  ],
})
export class VisualizationModule {}
