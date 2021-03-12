import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as Highcharts from "highcharts";
import { Options } from "highcharts/highstock";
import { CreatePlotBand } from "./createPlotBand.service";
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

  constructor(public createPlotBand: CreatePlotBand) {}

  chartOptions: Options = {
    xAxis: {
      tickInterval: 10
    },
    yAxis: {
      tickInterval: -0.1
    },
    series: [
      {
        name: "test",
        data: [],
        type: "line"
      }
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // if (!changes.config.firstChange) {
    //   if (changes.config.currentValue && changes.config.currentValue.series.length !== 0) {
    //     this.updateData(changes.config.currentValue);
    //     this.addPlotLine(changes.config.currentValue);
    //     console.log('first', changes.config.currentValue.series); }
        // this.addPlotBand(changes.config.currentValue);
      // } else {
      //   this.updateData(changes.config.previousValue);
      //   this.addPlotLine(changes.config.previousValue);
      //   console.log('second', changes.config.previousValue);
      //   // this.addPlotBand(changes.config.previousValue);
      // }
      // let series = null;
      // changes.config.currentValue.series.length !== 0
      // ? (series = changes.config.currentValue.series[0])

    if (changes.config) {
      if (changes.config.currentValue && changes.config.currentValue.series.length !== 0) {
        this.updateData(changes.config.currentValue);
        this.addPlotLine(changes.config.currentValue);
        this.addPlotBand(changes.config.currentValue);
        console.log('first', changes.config.currentValue.series); }
    }

  }

  updateData(cfg: ChartConfig) {
    console.log('update', cfg);
    Highcharts.setOptions({
      title: {
        text: `${cfg.name}`
      }
    })
    this.chartOptions.series = [
      {
        name: `${cfg.series[0].name}`,
        data: cfg.series[0].data,
        type: "line"
      }
    ];
  }

  addPlotLine(cfg: ChartConfig) {
    Highcharts.setOptions({
      yAxis: {
        plotLines: [
          {
            color: "red",
            value: cfg.threshold,
            dashStyle: "Dash"
          }
        ]
      }
    });
  }

  addPlotBand(cfg: ChartConfig) {
    const result = this.createPlotBand.create(cfg);
    let plotBands = [];
    let fromArr = result.map(item => item.from);
    let toArr = result.map(item => item.to);
    let i = 0;
    while (i < toArr.length) {
      plotBands.push({
        color: "#EFF8FB",
        from: fromArr[i],
        to: toArr[i]
      });
      i++;
    }
    Highcharts.setOptions({
      xAxis: {
        plotBands: plotBands
      }
    });
  }
}
