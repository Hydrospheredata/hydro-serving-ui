import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartConfig } from '@monitoring/interfaces';
@Component({
  selector: 'hs-latency-check',
  templateUrl: 'latency-check.component.html',
  styleUrls: ['latency-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatencyCheckComponent {
  @Input()
  set data(data: number[]) {
    if (data) {
      this.chartConfig = {
        ...this.chartConfig,
        data: {
          latency: {
            x: data.map((_, i) => i + 1),
            y: data,
          },
        },
      };
    }
  }

  chartConfig: ChartConfig = {
    data: {
      latency: {
        x: [],
        y: [],
      },
    },
    size: {
      width: 340,
      height: 68,
      margins: {
        left: 24,
        right: 24,
        top: 10,
        bottom: 24,
      },
    },
    plotBands: [],
    area: true,
    name: '',
  };
}
