import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ChartsViewModel, ChartViewModel } from '@monitoring/interfaces';
import { ModelVersion, TimeInterval } from '@shared/_index';

@Component({
  selector: 'hs-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  @Input() timeInterval: TimeInterval;
  @Input() detailedCharts: ChartsViewModel;
  @Input() siblingModelVersions: ModelVersion[];
  @Output() addedModelVersionIdToCompare: EventEmitter<
    any
  > = new EventEmitter();

  trackByMetricSpecId(chart: ChartViewModel) {
    return chart.metricSpecId;
  }

  onAddModelVersionIdToCompare(params) {
    this.addedModelVersionIdToCompare.next(params);
  }
}