import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'hs-batch-metrics',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchMetricsComponent {
  @Input() aggregation: any;
}
