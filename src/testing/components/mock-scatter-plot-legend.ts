import { Component, Input } from '@angular/core';
import { Colorizer } from '@app/modules/visualization/models';

@Component({
  selector: 'hs-scatter-plot-legend',
  template: '',
})
export class ScatterPlotLegendComponent {
  @Input() colorizer: Colorizer;
}
