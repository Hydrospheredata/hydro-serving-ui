import { Observable } from 'rxjs';
import { map, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { MetricSpecification } from '@app/core/data/types';
import { HydroServingState } from '@app/core/store/states/root.state';
import { neitherNullNorUndefined } from '@app/utils';

import { LoadMetrics, DeleteMetric, AddMetric } from '../actions';
import { selectSelectedMetrics } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class MetricsFacade {
  private selectedMetrics$ = this.store.pipe(
    select(selectSelectedMetrics),
    neitherNullNorUndefined,
    map(metrics =>
      metrics.sort(
        (m1, m2) => +m1.id.startsWith('fake') - +m2.id.startsWith('fake')
      )
    ),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(private store: Store<HydroServingState>) {}

  getSelectedMetrics(): Observable<MetricSpecification[]> {
    return this.selectedMetrics$;
  }

  loadMetrics(): void {
    this.store.dispatch(LoadMetrics());
  }

  deleteMetric(id: string): void {
    this.store.dispatch(DeleteMetric({ id }));
  }

  addMetric(metric: any): void {
    this.store.dispatch(AddMetric({ aggregation: metric }));
  }
}
