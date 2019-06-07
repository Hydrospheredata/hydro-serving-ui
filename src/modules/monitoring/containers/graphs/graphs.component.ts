import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GetMetricsAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'hs-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphsComponent implements OnInit {
  metrics = [
    {
      id: '0ba1b8a1-844f-43ec-9bfb-b1e75488880a',
      name: 'c',
      modelVersionId: 1,
      kind: 'CounterMetricSpec',
      withHealth: true,
    },
    {
      id: '1f26a809-56aa-40ee-a6e3-329ff8133d7c',
      name: 'c',
      modelVersionId: 2,
      kind: 'CounterMetricSpec',
      withHealth: true,
    },
  ];

  private modelVer;

  constructor(private store: Store<HydroServingState>) {}

  ngOnInit() {}

  loadMetrics(): void {
    this.store.dispatch(new GetMetricsAction(this.modelVer));
  }
}
