import { Injectable } from '@angular/core';
import { PlotBand } from './check-chart_v2.component';

export interface PlotBandData {
  threshold: number;
  data: number[];
}

@Injectable({
  providedIn: 'root',
})
export class CreatePlotBand {
  create({ data, threshold }: PlotBandData): Array<PlotBand> {
    let currentPlotBand: PlotBand = null;
    let i = 0;
    let result: Array<PlotBand> = [];
    for (i; i <= data.length; i++) {
      if (data[i] > threshold) {
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
