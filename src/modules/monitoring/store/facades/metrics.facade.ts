import { Injectable } from '@angular/core';
import { selectSelectedMetrics } from '@monitoring/store/selectors';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MetricsFacade {
  selectedMetrics$ = this.store.pipe(
    select(selectSelectedMetrics),
    map(metrics => {
      return metrics.sort(
        (m1, m2) => +m1.id.startsWith('fake') - +m2.id.startsWith('fake')
      );
    })
  );
  constructor(private store: Store<any>) {}
}
