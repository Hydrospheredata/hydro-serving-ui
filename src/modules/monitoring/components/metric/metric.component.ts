import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MetricSpecification } from '@shared/models/metric-specification.model';

@Component({
  selector: 'hs-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricComponent {

  @Input() deleteMetric: () => void;
  @Input() editMetric: () => void;
  @Input()
  private metric: MetricSpecification;

  get id() {
    return this.metric.id;
  }

  get name() {
    return this.metric.name;
  }

  get withHealth() {
    return this.metric.withHealth;
  }

  get config() {
    return this.metric.config;
  }

}
