import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  LinearChartComponent,
  ScatterPlotLegendComponent,
  GradientLegendComponent,
  ScatterPlotComponent,
} from './components';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LinearChartComponent,
    ScatterPlotComponent,
    ScatterPlotLegendComponent,
    GradientLegendComponent,
  ],
  exports: [LinearChartComponent, ScatterPlotComponent],
})
export class ChartsModule {}
