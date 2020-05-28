import { Injectable, OnDestroy } from '@angular/core';
import { ChecksAggregationResponse } from '@monitoring/models';
import { AggregationState } from '@monitoring/store/aggregation.state';
import { Aggregation, AggregationsList } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import { AggregationPaginator } from '@monitoring/services/aggregation-paginator';
import { MonitoringPageService } from '@monitoring/store/facades';
import { MonitoringFacade } from '@monitoring/store/monitoring.facade';
import { neitherNullNorUndefined } from '@shared/utils';
import { combineLatest, Observable, of, timer, Subject } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  shareReplay,
  takeUntil,
  withLatestFrom,
  distinctUntilChanged,
  take,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AggregationService implements OnDestroy {
  private readonly aggregationList$: Observable<AggregationsList>;
  private readonly groupedBy: number = 10;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private monitoringStore: MonitoringFacade,
    private paginator: AggregationPaginator
  ) {
    this.aggregationList$ = this.monitoringStore
      .getAggregationList()
      .pipe(neitherNullNorUndefined, shareReplay(1));

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
    return combineLatest([this.getAggregationList(), of(0)]).pipe(
      map(([aggregations, offset]) => {
        return this.paginator.canLoadOlder(
          aggregations.totalRequests,
          aggregations.showedRequests,
          offset,
          this.groupedBy
        );
      })
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
          if (aggregations.totalRequests === 0) {
            this.selectAggregation(undefined);
            return;
          }
          if (!aggregations.has(currentSelectedAggregation)) {
            this.selectAggregation(aggregations.lastAggregation);
            return;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  selectAggregation(agg: Aggregation): void {
    this.monitoringStore.selectAggregation(agg);
  }
}
