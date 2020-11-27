import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartConfig } from '../../../models';
import { ColorPaletteService } from '@app/core/color-palette.service';

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
        series: [
          { name: 'latency', color: this.colorPalette.getPalette()[0], data },
        ],
      };
    }
  }

  chartConfig: ChartConfig = {
    series: [
      { name: 'latency', color: this.colorPalette.getPalette()[0], data: [] },
    ],
    size: {
      height: 54,
      margins: {
        left: 24,
        right: 24,
        top: 4,
        bottom: 18,
      },
    },
    plotBands: [],
    area: true,
    name: '',
  };

  constructor(private colorPalette: ColorPaletteService) {}
}
