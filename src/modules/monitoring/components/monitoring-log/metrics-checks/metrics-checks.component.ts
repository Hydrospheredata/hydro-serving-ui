import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RawCheck } from '@monitoring/interfaces';

@Component({
  selector: 'hs-metrics-checks',
  templateUrl: './metrics-checks.component.html',
  styleUrls: ['./metrics-checks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsChecksComponent {
  @Input() metrics: { [metricName: string]: RawCheck };
}
