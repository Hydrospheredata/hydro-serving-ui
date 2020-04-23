import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Aggregation } from '@monitoring/models/Aggregation';

type BatchMetricCheckStatus = 'success' | 'fail' | 'unknown';

@Component({
  selector: 'hs-batch-metrics',
  templateUrl: './batch-metrics.component.html',
  styleUrls: ['./batch-metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchMetricsComponent {
  @Input() aggregation: Aggregation;

  get batchesNames() {
    const names = new Set([]);
    const batch = this.aggregation.batchesChecks;
    if (batch !== undefined) {
      const firstFeature = Object.values(batch)[0];
      Object.keys(firstFeature).forEach(n => {
        names.add(n);
      });
    }

    return names.keys();
  }

  checkStatus(check: {
    checked: number;
    passed: number;
  }): BatchMetricCheckStatus {
    if (check.checked === 0) {
      return 'unknown';
    }

    return check.checked === check.passed ? 'success' : 'fail';
  }
}
