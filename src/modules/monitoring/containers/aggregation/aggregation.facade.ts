import { Injectable } from '@angular/core';
import { ChecksAggregationResponse } from '@monitoring/interfaces';
import { Aggregation, AggregationsList } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import { AggregationPaginator } from '@monitoring/services/aggregation-paginator';
import { CheckAggregationBuilder } from '@monitoring/services/builders/check-aggregation.builder';
import { State } from '@monitoring/store';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { Store } from '@ngrx/store';
import { isEqual } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of, timer } from 'rxjs';
import {
  catchError,
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AggregationFacade {
  groupedBy$: BehaviorSubject<number> = new BehaviorSubject(10);
  loading$: Observable<boolean>;
  error$: Observable<string>;
  totalRequests$: Observable<number>;
  showedRequests$: Observable<number>;
  aggregations$: Observable<AggregationsList>;
  canLoadRight$: Observable<boolean>;
  canLoadLeft$: Observable<boolean>;

  checksAggregationResponse$: Observable<ChecksAggregationResponse>;
  private currentOffset: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private error: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private monitoringPageFacade: MonitoringPageFacade,
    private monitoring: MonitoringService,
    private checkAggBuilder: CheckAggregationBuilder,
    private store: Store<State>,
    private paginator: AggregationPaginator
  ) {
    this.loading$ = this.loading.asObservable();
    this.error$ = this.error.asObservable();
    this.checksAggregationResponse$ = combineLatest(
      this.monitoringPageFacade.modelVersion$,
      this.currentOffset.asObservable()
    ).pipe(
      switchMap(([modelVersion, offset]) => {
        return timer(0, 5000).pipe(
          switchMap(() => {
            this.loading.next(true);
            return this.monitoring
              .getChecksAggregation({
                limit: 80,
                modelVersionId: modelVersion.id,
                offset,
              })
              .pipe(
                catchError(err => {
                  this.loading.next(false);
                  this.error.next(err);
                  return of({}) as Observable<ChecksAggregationResponse>;
                })
              );
          }),
          tap(_ => {
            this.loading.next(false);
          }),
          startWith(null),
          pairwise(),
          filter(([prev, cur]) => {
            return !isEqual(prev, cur);
          }),
          map(([_, cur]) => cur)
        );
      }),
      shareReplay(1)
    );

    this.aggregations$ = combineLatest(
      this.checksAggregationResponse$,
      this.monitoringPageFacade.selectedMetrics$
    ).pipe(
      map(([aggregationResponse]) => {
        const aggregations = aggregationResponse.results
          .map(aggregation => new Aggregation(aggregation))
          .reverse();
        return new AggregationsList(aggregations);
      }),
      shareReplay(1)
    );
    this.totalRequests$ = this.checksAggregationResponse$.pipe(
      map(response => {
        const batches = response.count;
        const countInOneBatch =
          response.results[response.results.length - 1]._hs_requests;
        if (batches === 1) {
          return countInOneBatch;
        } else {
          return (
            countInOneBatch * (batches - 1) + response.results[0]._hs_requests
          );
        }
      })
    );
    this.showedRequests$ = this.checksAggregationResponse$.pipe(
      filter(val => val !== undefined),
      map(({ results }) => {
        if (results === undefined) {
          return 0;
        }
        return results.reduce(
          (result, { _hs_requests }) => result + _hs_requests,
          0
        );
      })
    );

    this.canLoadRight$ = this.currentOffset
      .asObservable()
      .pipe(map(offset => this.paginator.canLoadNewest(offset)));
    this.canLoadLeft$ = combineLatest(
      this.totalRequests$,
      this.showedRequests$,
      this.currentOffset.asObservable(),
      of(10)
    ).pipe(
      map(([count, receivedCount, offset, groupedBy]) => {
        return this.paginator.canLoadOlder(
          count,
          receivedCount,
          offset,
          groupedBy
        );
      })
    );
  }

  selectAggregation(agg: Aggregation): void {
    this.monitoringPageFacade.selectAggregation(agg);
  }

  loadOlder() {
    this.currentOffset.next(this.currentOffset.getValue() + 1);
  }

  loadNewest() {
    this.currentOffset.next(this.currentOffset.getValue() - 1);
  }
}
