import { Injectable } from '@angular/core';
import { selectSelectedMetrics } from '@monitoring/store/selectors';
import { select, Store } from '@ngrx/store';
import { filter, map, shareReplay, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MetricsFacade {
  selectedMetrics$ = this.store.pipe(
    select(selectSelectedMetrics),
    filter(val => val !== undefined),
    map(metrics => {
      return metrics.sort(
        (m1, m2) => +m1.id.startsWith('fake') - +m2.id.startsWith('fake')
      );
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );
  constructor(private store: Store<any>) {}
}
