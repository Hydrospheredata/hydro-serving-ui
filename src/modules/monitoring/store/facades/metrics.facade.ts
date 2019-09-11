import { Injectable } from '@angular/core';
import { selectSelectedMetrics } from '@monitoring/store/selectors';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class MetricsFacade {
  selectedMetrics$ = this.store.pipe(select(selectSelectedMetrics));
  constructor(private store: Store<any>) {}
}
