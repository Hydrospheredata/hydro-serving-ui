import { Component, Input } from '@angular/core';
import { Colorizer } from '@core/models';

@Component({
  selector: 'hs-scatter-plot-legend',
  template: '',
})
export class ScatterPlotLegendComponent {
  @Input() colorizer: Colorizer;
}
