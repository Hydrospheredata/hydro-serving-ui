import { Component, Input } from '@angular/core';
import { TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-charts',
  template: '',
})
export class ChartsComponent {
  @Input() selectedTimeInterval$: Observable<TimeInterval>;
  @Input() metricSpecifications: MetricSpecification;
}
