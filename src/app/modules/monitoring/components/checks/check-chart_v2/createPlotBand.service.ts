import { Injectable } from "@angular/core";
import { PlotBand } from "./check-chart_v2.component";
import { ChartConfig } from '@app/modules/monitoring/models';

@Injectable({
  providedIn: "root"
})
export class CreatePlotBand {
  create({series, threshold}: ChartConfig) {
    if (series[0]) {
      let currentPlotBand: PlotBand = null;
      let i = 0;
      let result = [];
      for (i; i <= series[0].data.length; i++) {
        if (series[0].data[i] > threshold) {
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
}
