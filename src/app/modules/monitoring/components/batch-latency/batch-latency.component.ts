import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColorPaletteService } from '@app/core/color-palette.service';
import { CheckCollection, ChartConfig } from '../../models';

@Component({
  selector: 'hs-batch-latency',
  templateUrl: './batch-latency.component.html',
  styleUrls: ['./batch-latency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchLatencyComponent {
  @Input() set requests(reqs: CheckCollection) {
    const data: number[] = reqs.getLatency();

    this.chartConfig = {
      ...this.chartConfig,
      series: [
        { name: 'latency', color: this.colorPalette.getPalette()[0], data },
      ],
    };
  }

  chartConfig: ChartConfig = {
    series: [
      { name: 'latency', color: this.colorPalette.getPalette()[0], data: [] },
    ],
    size: {
      height: 180,
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
