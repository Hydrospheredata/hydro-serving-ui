import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ChecksAggregation } from '@monitoring/interfaces';

@Component({
  selector: 'hs-batch-metrics',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchMetricsComponent {
  @Input() aggregation: ChecksAggregation;
}
