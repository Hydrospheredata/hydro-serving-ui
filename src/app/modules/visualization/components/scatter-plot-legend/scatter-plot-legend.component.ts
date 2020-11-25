import { Component, Input } from '@angular/core';
import {
  Colorizer,
  SCATTER_PLOT_PALETTE,
} from '@app/modules/visualization/models';

@Component({
  selector: 'hs-scatter-plot-legend',
  templateUrl: './scatter-plot-legend.component.html',
  styleUrls: ['./scatter-plot-legend.component.scss'],
})
export class ScatterPlotLegendComponent {
  readonly palette: ReadonlyArray<string>;

  @Input() colorizer: Colorizer;
  constructor() {
    this.palette = SCATTER_PLOT_PALETTE;
  }
}
