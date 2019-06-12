import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';

@Component({
  selector: 'hs-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  @Input() selectedTimeInterval: TimeInterval;
  @Input() metricSpecifications: MetricSpecification;
  liveUpdate: boolean = false;
}
