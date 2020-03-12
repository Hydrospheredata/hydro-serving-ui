import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CustomCheck, ChartConfig } from '@monitoring/interfaces';

@Component({
  selector: 'hs-custom-check',
  templateUrl: 'custom-check.component.html',
  styleUrls: ['custom-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCheckComponent implements OnChanges {
  @Input() check: CustomCheck;

  get name(): string {
    return this.check && this.check.name;
  }

  get threshold(): number {
    return this.check && this.check.threshold;
  }

  chartConfig: ChartConfig = {
    size: {
      width: 1000,
      height: 170,
      margins: {
        left: 86,
        right: 12,
        top: 12,
        bottom: 18,
      },
    },
    plotBands: [],
    name: 'custom',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const check = changes.check && changes.check.currentValue;
    if (check) {
      this.chartConfig = {
        ...this.chartConfig,
        data: {
          [check.name]: {
            x: check.data.map((_, i) => i + 1),
            y: check.data,
          },
        },
        plotBands: this.buildPlotBands(check.health),
        threshold: check.threshold,
        name: check.name,
      };
    }
  }

  private buildPlotBands(
    health: boolean[]
  ): Array<{ from: number; to: number }> {
    let currentBand: { from: number; to: number };
    const res = [];
    health.forEach((check, idx) => {
      if (!check) {
        if (currentBand) {
          currentBand.to = idx + 1;
        } else {
          currentBand = { from: idx + 1, to: idx + 1 };
        }
      } else {
        if (currentBand) {
          res.push({ ...currentBand });
          currentBand = undefined;
        }
      }
    });

    if (currentBand) {
      res.push({ ...currentBand });
    }

    return res;
  }
}
