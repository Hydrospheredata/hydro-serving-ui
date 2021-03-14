import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as Highcharts from "highcharts";
import { CreatePlotBand, PlotBandData } from './createPlotBand.service';
import { ChartConfig } from '@app/modules/monitoring/models';

export interface PlotBand {
  from: number;
  to: number;
}

@Component({
  selector: 'hs-check-chart_v2',
  templateUrl: './check-chart_v2.component.html',
  styleUrls: ['./check-chart_v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckChartComponentV2 implements OnChanges {
  name: string = '';
  threshold: number;
  data: number[];
  cfg: ChartConfig;
  series: ChartConfig['series'];

  @Input() set config(cfg: ChartConfig) {

    this.cfg = cfg;

    this.name = cfg.name;
    this.threshold = cfg.threshold;
    this.series = cfg.series;
  }

  Highcharts: typeof Highcharts = Highcharts;

  updateFormInput: boolean = false;

  constructor(public createPlotBand: CreatePlotBand) {}

  chartOptions: Highcharts.Options = {
    series: [
      {
        name: "test",
        data: [],
        type: "line"
      }
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      if (changes.config.currentValue && changes.config.currentValue.series.length !== 0) {
        this.updateData(changes.config.currentValue);
        this.addPlotLine(changes.config.currentValue);
        this.addPlotBand(changes.config.currentValue);
      }
    }
  }

  updateData(cfg: ChartConfig) {
    this.chartOptions = {
      tooltip: {
        headerFormat: undefined,
        pointFormat:
          `<span style="color: rgb(65, 142, 204); font-weight: bold">
           ${cfg.series[0].name}</span>: <b>{point.y}</b>`,
      },
      title: {
        text: `${cfg.name}`
      },
      series: [
        {
          name: `${cfg.series[0].name}`,
          data: cfg.series[0].data,
          type: "line"
        }
      ]
    }
    this.updateFormInput = true;
  }

  addPlotLine(cfg: ChartConfig) {
    this.chartOptions.yAxis = {
      plotLines: [
        {
          color: "#E12D39",
          value: cfg.threshold,
          width: 2,
          dashStyle: "Dash"
        }
      ]
    }
    this.updateFormInput = true;
  }

  addPlotBand(cfg: ChartConfig) {
    const pbd: PlotBandData = {
      data: cfg.series[0].data,
      threshold: cfg.threshold
    }

    const result = this.createPlotBand.create(pbd);
    let plotBands = [];
    let fromArr = result.map(item => item.from);
    let toArr = result.map(item => item.to);
    let i = 0;
    while (i < toArr.length) {
      plotBands.push({
        color: "#B0C4DE",
        width: 2,
        from: fromArr[i],
        to: toArr[i]
      });
      i++;
    }
    this.chartOptions.xAxis = {
      plotBands: plotBands
    }
    this.updateFormInput = true;
  }
}
