import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CustomCheck, ChartConfig } from '@monitoring/interfaces';

@Component({
  selector: 'hs-custom-check',
  templateUrl: 'custom-check.component.html',
  styleUrls: ['custom-check.component.scss'],
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
    data: {
      x: [],
      y: [],
    },
    size: {
      width: 960,
      height: 170,
      margins: {
        left: 24,
        right: 12,
        top: 12,
        bottom: 18,
      },
    },
    name: 'custom',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const check = changes.check && changes.check.currentValue;
    if (check) {
      this.chartConfig = {
        ...this.chartConfig,
        data: {
          x: check.data.map((_, i) => i + 1),
          y: check.data,
        },
        threshold: check.threshold,
        name: check.name,
      };
    }
  }
}
