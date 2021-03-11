import { Injectable } from "@angular/core";
import { PlotBand } from "./check-chart_v2.component";
import { ChartConfig } from '@app/modules/monitoring/models';

@Injectable({
  providedIn: "root"
})
export class CreatePlotBand {
  create(cfg: ChartConfig) {
    let currentPlotBand: PlotBand = null;
    let i = 0;
    let result = [];
    for (i; i <= cfg.series[0].data.length; i++) {
      if (cfg.series[0].data[i] > cfg.threshold) {
        currentPlotBand
          ? (currentPlotBand.to = i)
          : (currentPlotBand = { from: i, to: i });
      } else {
        if (currentPlotBand) {
          result.push(currentPlotBand);
          currentPlotBand = null;
        }
      }
    }
    return result;
  }
}
