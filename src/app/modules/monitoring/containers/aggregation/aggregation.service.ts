import { combineLatest, Observable, Subject } from 'rxjs';
import {
  map,
  tap,
  shareReplay,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import { Injectable, OnDestroy } from '@angular/core';
import { neitherNullNorUndefined } from '@app/utils';

import { Aggregation, AggregationsList } from '../../models';
import { AggregationPaginator } from '../../services/aggregation-paginator';
import { MonitoringFacade } from '../../store/monitoring.facade';

@Injectable({
  providedIn: 'root',
})
export class AggregationService implements OnDestroy {
  private readonly aggregationList$: Observable<AggregationsList>;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private monitoringStore: MonitoringFacade,
    private paginator: AggregationPaginator,
  ) {
    this.aggregationList$ = this.monitoringStore
      .getAggregationList()
      .pipe(shareReplay(1));

    this.checkSelectedAggregation();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSelectedAggregation(): Observable<Aggregation> {
    return this.monitoringStore.getSelectedAggregation();
  }

  getAggregationList(): Observable<AggregationsList> {
    return this.aggregationList$;
  }

  canLoadNewer(): Observable<boolean> {
    return this.monitoringStore
      .getOffset()
      .pipe(map(offset => this.paginator.canLoadNewer(offset)));
  }

  canLoadOlder(): Observable<boolean> {
    return combineLatest([
      this.getAggregationList(),
      this.monitoringStore.getOffset(),
    ]).pipe(
      map(([aggregations, offset]) => {
        if (aggregations) {
          return this.paginator.canLoadOlder(
            aggregations.totalBatchesCount,
            aggregations.showedBatchesCount,
            offset,
          );
        } else {
          return false;
        }
      }),
    );
  }

  loadOlder(): void {
    this.monitoringStore.loadOlderAggregation();
  }

  loadNewer(): void {
    this.monitoringStore.loadNewerAggregation();
  }

  private checkSelectedAggregation() {
    this.getAggregationList()
      .pipe(
        neitherNullNorUndefined,
        withLatestFrom(this.getSelectedAggregation()),
        tap(([aggregations, currentSelectedAggregation]) => {
          if (aggregations.totalBatchesCount === 0) {
            this.selectAggregation(undefined);
            return;
          }
          if (!aggregations.has(currentSelectedAggregation)) {
            this.selectAggregation(aggregations.lastAggregation);
            return;
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  selectAggregation(agg: Aggregation): void {
    this.monitoringStore.selectAggregation(agg);
  }

  getMinDate(): Observable<Date> {
    return this.monitoringStore
      .getMinDate()
      .pipe(map(seconds => seconds && new Date(seconds * 1000)));
  }

  getMaxDate(): Observable<Date> {
    return this.monitoringStore
      .getMaxDate()
      .pipe(map(seconds => seconds && new Date(seconds * 1000)));
  }

  getFilterDateRange(): Observable<{ from: Date; to: Date }> {
    return this.monitoringStore.getFilterDateRange().pipe(
      map(range => {
        return (
          range && {
            from: new Date(range.from * 1000),
            to: new Date(range.to * 1000),
          }
        );
      }),
    );
  }

  changeDateTimeRange({ from, to }: { from: Date; to: Date }): void {
    this.monitoringStore.changeDateTimeRange({
      from: from.getTime(),
      to: to.getTime(),
    });
  }

  clearDateTimeFilter(): void {
    this.monitoringStore.clearFilterDateRange();
  }
}
