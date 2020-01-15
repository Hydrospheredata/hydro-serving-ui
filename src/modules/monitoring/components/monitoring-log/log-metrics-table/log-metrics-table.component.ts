import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RawCheck } from '@monitoring/interfaces';

@Component({
  selector: 'hs-log-metrics-table',
  templateUrl: './log-metrics-table.component.html',
  styleUrls: ['./log-metrics-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogMetricsTableComponent {
  @Input() metrics: { [metricName: string]: RawCheck };
}
