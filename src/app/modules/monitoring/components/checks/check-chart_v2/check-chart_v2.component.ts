import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { CreatePlotBand, PlotBandData } from './createPlotBand.service';
import { ChartConfig } from '@app/modules/monitoring/models';
import { MonitoringPageService } from '@app/modules/monitoring/containers/monitoring-page/monitoring-page.service';
import { initializeChartOptions } from '@app/modules/monitoring/components/checks/check-chart_v2/initializeChartOptions';

export interface PlotBand {
  from: number;
  to: number;
}

const noData = require('highcharts/modules/no-data-to-display');
noData(Highcharts);

@Component({
  selector: 'hs-check-chart-v2',
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

  updateFormInput: boolean = true;

  constructor(
    public createPlotBand: CreatePlotBand,
    public monitoringPageService: MonitoringPageService,
  ) {}

  chartOptions = {
    title: {},
    tooltip: {},
    series: [
      {
        name: 'test',
        data: [],
        type: 'spline',
      },
    ],
    lang: {},
    noData: {},
    xAxis: {
      plotBands: [],
    },
    yAxis: {
      title: {
        text: undefined,
      },
      plotLines: [],
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        marker: {
          enabled: false,
        },
      },
      series: {
        cursor: 'pointer',
        point: {
          events: {},
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config.firstChange) {
      this.chartOptions = initializeChartOptions(changes.config);
    }

    if (
      changes.config.currentValue &&
      changes.config.currentValue.series.length !== 0
    ) {
      this.updateData(changes.config.currentValue);
      this.addPlotLine(changes.config.currentValue);
      this.addPlotBand(changes.config.currentValue);
    }
  }

  updateData(cfg: ChartConfig) {
    let self = this;

    this.chartOptions = {
      tooltip: {
        headerFormat: undefined,
        pointFormat: `<span style="color: #4098d7; font-weight: bold">
           ${cfg.series[0].name}</span>: <b>{point.y}</b>`,
        crosshairs: {
          color: 'lightgrey',
        },
      },
      title: {
        text: `${cfg.name}`,
      },
      series: [
        {
          name: `${cfg.series[0].name}`,
          data: cfg.series[0].data,
          type: 'spline',
        },
      ],
      lang: {
        noData: 'no data available',
      },
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#bcccdc',
        },
      },
      xAxis: {
        plotBands: [],
      },
      yAxis: {
        title: {
          text: undefined,
        },
        plotLines: [],
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 2,
            },
          },
          marker: {
            enabled: false,
          },
        },
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                self.monitoringPageService.showCheckDetails(null, this.x);
              },
            },
          },
        },
      },
    };
  }

  addPlotLine(cfg: ChartConfig) {
    this.chartOptions.yAxis.plotLines = [
      {
        color: '#cf1124',
        value: cfg.threshold,
        width: 2,
        dashStyle: 'Dash',
      },
    ];
  }

  addPlotBand(cfg: ChartConfig) {
    const pbd: PlotBandData = {
      data: cfg.series[0].data,
      threshold: cfg.threshold,
    };

    const result = this.createPlotBand.create(pbd);
    let plotBands = [];
    let fromArr = result.map(item => item.from);
    let toArr = result.map(item => item.to);
    let i = 0;
    while (i < toArr.length) {
      plotBands.push({
        color: '#ff9b9b',
        width: 2,
        from: fromArr[i],
        to: toArr[i],
      });
      i++;
    }
    this.chartOptions.xAxis.plotBands = plotBands;
  }
}
