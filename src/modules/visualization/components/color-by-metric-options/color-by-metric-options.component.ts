import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Metric } from '@core/models';

@Component({
  selector: 'hs-color-by-metric-options',
  templateUrl: './color-by-metric-options.component.html',
  styleUrls: ['./color-by-metric-options.component.scss'],
})
export class ColorByMetricOptionsComponent {
  @Input() metricName: string;
  @Input() metric: Metric;
  @Input() metricsNames: string[];
  @Output() metricNameChanged: EventEmitter<string> = new EventEmitter();

  onMetricNameChange(metricName: string): void {
    this.metricNameChanged.next(metricName);
  }
}
