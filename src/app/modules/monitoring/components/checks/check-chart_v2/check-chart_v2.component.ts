import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as Highcharts from "highcharts";
import { Options } from "highcharts/highstock";
import { CreatePlotBand } from "./createPlotBand.service";
import { ChartConfig } from '@app/modules/monitoring/models';

export interface PlotBand {
  from: number;
  to: number;
}

export interface ChartData {
  data: Array<number>;
  threshold: number;
  name: string;
}

@Component({
  selector: 'hs-check-chart_v2',
  templateUrl: './check-chart_v2.component.html',
  styleUrls: ['./check-chart_v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckChartComponentV2 implements OnChanges {
  @Input() config: ChartConfig;

  Highcharts: typeof Highcharts = Highcharts;

  constructor(public createPlotBand: CreatePlotBand) {}

  chartOptions: Options = {
    title: {
      text: `${this.config.name}`
    },
    xAxis: {
      tickInterval: 10
    },
    yAxis: {
      tickInterval: 10
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
    if (changes.data) {
      this.updateData(this.config);
      this.addPlotLine(this.config);
      this.addPlotBand();
    }
  }

  updateData(config: ChartConfig) {
    this.chartOptions.series = [
      {
        name: "test",
        data: config.series[0].data,
        type: "line"
      }
    ];
  }

  addPlotLine(config: ChartConfig) {
    Highcharts.setOptions({
      yAxis: {
        plotLines: [
          {
            color: "red",
            value: config.threshold,
            dashStyle: "Dash"
          }
        ]
      }
    });
  }

  addPlotBand() {
    const result = this.createPlotBand.create(this.config);
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
