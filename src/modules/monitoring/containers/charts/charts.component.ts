import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { Store } from '@ngrx/store';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent implements OnInit {
  metrics$: Observable<MetricSpecification[]>;

  constructor(
    private store: Store<HydroServingState>
  ) {}

  ngOnInit() {
    this.metrics$ = this.store.select(getSelectedMetrics);
  }
}
