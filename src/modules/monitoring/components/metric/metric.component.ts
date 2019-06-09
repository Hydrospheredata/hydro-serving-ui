import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MetricSpecification } from '@shared/models/metric-specification.model';

@Component({
  selector: 'hs-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricComponent {

  @Output() deleteMetric = new EventEmitter();
  @Input() editMetric: () => void;
  @Input()
  metric: MetricSpecification;

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

  onDeleteMetric() {
    this.deleteMetric.next(this.id);
  }
}
