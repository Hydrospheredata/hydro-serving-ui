import { Injectable } from '@angular/core';
import { LoadMetrics, DeleteMetric, AddMetric } from '@monitoring/store';
import { selectSelectedMetrics } from '@monitoring/store/selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from '@node_modules/rxjs';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { neitherNullNorUndefined } from '@shared/utils';
import { map, shareReplay, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MetricsFacade {
  selectedMetrics$ = this.store.pipe(
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
  constructor(private store: Store<any>) {}

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
