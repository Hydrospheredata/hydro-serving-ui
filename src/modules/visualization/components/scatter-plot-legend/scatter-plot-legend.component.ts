import { Component, OnInit, Input } from '@angular/core';
import { ScatterPlotLegendConfig } from 'modules/visualization/models/ScatterPlotLegendConfig';
import { SCATTER_PLOT_PALETTE } from 'modules/visualization/models/ScatterPlotPalette';

@Component({
  selector: 'hs-scatter-plot-legend',
  templateUrl: './scatter-plot-legend.component.html',
  styleUrls: ['./scatter-plot-legend.component.scss'],
})
export class ScatterPlotLegendComponent implements OnInit {
  readonly palette: ReadonlyArray<string>;

  @Input() config: ScatterPlotLegendConfig;
  constructor() {
    this.palette = SCATTER_PLOT_PALETTE;
  }

  ngOnInit() {}
}
