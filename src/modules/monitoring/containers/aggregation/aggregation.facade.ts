import { Injectable } from '@angular/core';
import { ChecksAggregationResponse } from '@monitoring/models';
import { Aggregation, AggregationsList } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import { AggregationPaginator } from '@monitoring/services/aggregation-paginator';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { isEqual } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of, timer } from 'rxjs';
import {
  catchError,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  tap,
  share,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AggregationFacade {
  groupedBy$: BehaviorSubject<number> = new BehaviorSubject(10);
  loading$: Observable<boolean>;
  error$: Observable<string>;
  aggregations$: Observable<AggregationsList>;
  canLoadRight$: Observable<boolean>;
  canLoadLeft$: Observable<boolean>;
  selectedAggregation$: Observable<Aggregation>;
  checksAggregationResponse$: Observable<ChecksAggregationResponse>;

  private selectedAggregation: BehaviorSubject<
    Aggregation
  > = new BehaviorSubject<Aggregation>(null);
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
    private paginator: AggregationPaginator
  ) {
    this.selectedAggregation$ = this.selectedAggregation.asObservable();
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
                  return of(null);
                })
              );
          }),
          tap(_ => {
            this.loading.next(false);
          }),
          startWith({
            result: [],
            count: 0,
          }),
          pairwise(),
          filter(([prev, cur]) => {
            return !isEqual(prev, cur);
          }),
          map(([_, cur]) => cur)
        );
      }),
      share()
    );

    this.aggregations$ = this.checksAggregationResponse$
      .pipe(tap(console.log))
      .pipe(
        map(([{ results, count }]) => {
          console.log('here');
          const aggregations = results
            .map(aggregation => new Aggregation(aggregation))
            .reverse();
          return new AggregationsList(aggregations, count);
        }),
        share()
      );

    this.canLoadRight$ = this.currentOffset
      .asObservable()
      .pipe(map(offset => this.paginator.canLoadNewest(offset)));
    this.canLoadLeft$ = combineLatest(
      this.aggregations$,
      this.currentOffset.asObservable(),
      of(10)
    ).pipe(
      map(([aggregations, offset, groupedBy]) => {
        return this.paginator.canLoadOlder(
          aggregations.totalRequests,
          aggregations.showedRequests,
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
