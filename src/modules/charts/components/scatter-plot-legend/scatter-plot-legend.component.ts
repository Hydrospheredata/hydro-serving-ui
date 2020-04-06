import { Component, OnInit, Input } from '@angular/core';
import { SCATTER_PLOT_PALETTE, Colorizer } from '@core/models';

@Component({
  selector: 'hs-scatter-plot-legend',
  templateUrl: './scatter-plot-legend.component.html',
  styleUrls: ['./scatter-plot-legend.component.scss'],
})
export class ScatterPlotLegendComponent implements OnInit {
  readonly palette: ReadonlyArray<string>;

  @Input() colorizer: Colorizer;
  constructor() {
    this.palette = SCATTER_PLOT_PALETTE;
  }

  ngOnInit() {}
}
