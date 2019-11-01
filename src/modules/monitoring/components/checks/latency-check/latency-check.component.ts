import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartConfig } from '@monitoring/interfaces';
import {
  ScaleLinear,
  extent,
  scaleLinear,
  select,
  mouse,
  bisectLeft,
} from 'd3';

@Component({
  selector: 'hs-latency-check',
  templateUrl: 'latency-check.component.html',
  styleUrls: ['latency-check.component.scss'],
})
export class LatencyCheckComponent {
  @Input()
  set data(data: number[]) {
    if (data) {
      this.chartConfig = {
        ...this.chartConfig,
        data: {
          x: data.map((_, i) => i + 1),
          y: data,
        },
      };
    }
  }

  chartConfig: ChartConfig = {
    data: {
      x: [],
      y: [],
    },
    size: {
      width: 320,
      height: 80,
      margins: {
        left: 24,
        right: 24,
        top: 10,
        bottom: 24,
      },
    },
    area: true,
    name: 'latency',
  };
}
