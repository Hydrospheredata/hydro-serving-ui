import { Component, OnInit } from '@angular/core';
import { GetMetricsAction } from '@core/actions/monitoring.actions';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { getSelectedModelVersion } from '@models/reducers';
import { DialogAddMetricComponent, DialogDeleteMetricComponent, METRIC_ID_VALUE } from '@monitoring/components';
import { Store } from '@ngrx/store';
import { IMetricSpecification } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';
import { tap, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'hs-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  metrics$: Observable<IMetricSpecification[]>;

  constructor(
    private store: Store<HydroServingState>,
    private dialog: DialogService
  ) {}

  addMetric() {
    this.dialog.createDialog({
      component: DialogAddMetricComponent,
    });
  }

  ngOnInit() {
    this.metrics$ = this.store.select(getSelectedModelVersion).pipe(
      filter(_ => !!_),
      tap(_ => this.store.dispatch(new GetMetricsAction(`${_.id}`))),
      switchMap(() => this.store.select(getSelectedMetrics))
    );
  }

  deleteMetric(metricId: string) {
    return () => {
      this.dialog.createDialog({
        component: DialogDeleteMetricComponent,
        providers: [{provide: METRIC_ID_VALUE, useValue: metricId}],
      });
    };
  }
}
