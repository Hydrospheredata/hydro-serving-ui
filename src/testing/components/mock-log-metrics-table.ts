import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'hs-log-metrics-table',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogMetricsTableComponent {
  @Input() metrics: any;
}
