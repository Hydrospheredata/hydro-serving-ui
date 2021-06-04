import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { ModelVersion } from '@app/core/data/types';
import { selectCheckToShowInDetails } from '../store/selectors/ui.selectors';

import {
  Aggregation,
  CheckId,
  Check,
  AggregationsList,
  CheckCollection,
} from '../models';
import {
  LoadChecks,
  ClearMonitoringPage,
  LoadOlderAggregation,
  LoadNewerAggregation,
  ShowCheckDetails,
  CloseCheckDetails,
  SetFilterDateRange,
  ClearFilterDateRange,
} from './actions';
import {
  LoadAggregations,
  SelectAggregation,
} from './actions/aggregation.actions';

import {
  selectAggregationList,
  selectOffset,
  selectSelectedAggregation,
  selectChecks,
  selectChecksLoading,
  selectFilterDateRange,
  selectMinDate,
  selectMaxDate,
} from './selectors';

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

  getCheckToShowInDetails(): Observable<Check> {
    return this.store.pipe(select(selectCheckToShowInDetails));
  }

  isChecksLoading(): Observable<boolean> {
    return this.store.pipe(select(selectChecksLoading));
  }

  getMinDate(): Observable<number> {
    return this.store.pipe(select(selectMinDate));
  }

  getMaxDate(): Observable<number> {
    return this.store.pipe(select(selectMaxDate));
  }

  getFilterDateRange(): Observable<{ from: number; to: number }> {
    return this.store.pipe(select(selectFilterDateRange));
  }

  clearMonitoringPage(): void {
    this.store.dispatch(ClearMonitoringPage());
  }

  clearFilterDateRange(): void {
    this.store.dispatch(ClearFilterDateRange());
  }

  selectAggregation(aggregation: Aggregation): void {
    this.store.dispatch(SelectAggregation({ aggregation }));
  }

  loadAggregation(props: {
    modelVersion: ModelVersion;
    offset: number;
    limit: number;
    from: string;
    to: string;
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

  showChecksDetails(checkId: CheckId): void {
    this.store.dispatch(ShowCheckDetails({ checkId }));
  }

  closeChecksDetails(): void {
    this.store.dispatch(CloseCheckDetails());
  }

  changeDateTimeRange(range: { from: number; to: number }): void {
    this.store.dispatch(SetFilterDateRange(range));
  }
}
