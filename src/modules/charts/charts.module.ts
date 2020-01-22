import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LinearChartComponent } from './components/linear-chart/linear-chart.component';
import { ScatterPlotComponent } from './components/scatter-plot/scatter-plot.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LinearChartComponent, ScatterPlotComponent],
  exports: [LinearChartComponent, ScatterPlotComponent],
})
export class ChartsModule {}
