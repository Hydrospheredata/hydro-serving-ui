import { Injectable } from '@angular/core';
import { AggregationsList, Aggregation, CheckCollection } from '@monitoring/models';
import {
  LoadChecks,
  ClearMonitoringPage,
  LoadOlderAggregation,
  LoadNewerAggregation,
} from '@monitoring/store/actions';
import { LoadAggregations, SelectAggregation } from '@monitoring/store/actions/aggregation.actions';
import {
  selectAggregationList,
  selectOffset,
  selectSelectedAggregation,
  selectChecks,
} from '@monitoring/store/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from '@node_modules/rxjs';
import { State as MonitoringState } from './reducers';

@Injectable()
export class MonitoringFacade {
  constructor(private readonly store: Store<MonitoringState>) {}

  getAggregationList(): Observable<AggregationsList> {
    return this.store.pipe(select(selectAggregationList));
  }

  getOffset(): Observable<number> {
    return this.store.pipe(select(selectOffset));
  }

  getSelectedAggregation(): Observable<Aggregation> {
    return this.store.pipe(select(selectSelectedAggregation));
  }

  getChecks(): Observable<CheckCollection> {
    return this.store.pipe(select(selectChecks));
  }

  clearMonitoringPage(): void {
    this.store.dispatch(ClearMonitoringPage());
  }

  selectAggregation(aggregation: Aggregation): void {
    this.store.dispatch(SelectAggregation({ aggregation }));
  }

  loadAggregation(props: {
    modelVerId: number;
    offset: number;
    limit: number;
  }): void {
    this.store.dispatch(LoadAggregations(props));
  }

  loadOlderAggregation(): void {
    this.store.dispatch(LoadOlderAggregation());
  }

  loadNewerAggregation(): void {
    this.store.dispatch(LoadNewerAggregation());
  }

  loadChecks(props: {
    modelVersionId: number;
    from: string;
    to: string;
  }): void {
    this.store.dispatch(LoadChecks(props));
  }
}
