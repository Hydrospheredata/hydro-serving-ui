import { Component, OnInit } from '@angular/core';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import {
  DialogMetricComponent,
  DialogDeleteMetricComponent,
  METRIC_ID_VALUE,
  metricSpec,
} from '@monitoring/components';
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

  onAddMetric() {
    this.dialog.createDialog({
      component: DialogMetricComponent,
    });
  }

  ngOnInit() {
    this.metrics$ = this.store.select(getSelectedMetrics);
  }

  onDeleteMetric(metricId: string) {
    this.dialog.createDialog({
      component: DialogDeleteMetricComponent,
      providers: [{ provide: METRIC_ID_VALUE, useValue: metricId }],
    });
  }

  onEditMetric(metricSpecification: MetricSpecification) {
    this.dialog.createDialog({
      component: DialogMetricComponent,
      providers: [{ provide: metricSpec, useValue: metricSpecification }],
    });
  }
}
