import { Component, OnInit } from '@angular/core';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { DialogAddMetricComponent, DialogDeleteMetricComponent, METRIC_ID_VALUE } from '@monitoring/components';
import { Store } from '@ngrx/store';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  metrics$: Observable<MetricSpecification[]>;

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
    this.metrics$ = this.store.select(getSelectedMetrics);
  }

  deleteMetric(metricId: string) {
      this.dialog.createDialog({
        component: DialogDeleteMetricComponent,
        providers: [{provide: METRIC_ID_VALUE, useValue: metricId}],
      });
  }
}
