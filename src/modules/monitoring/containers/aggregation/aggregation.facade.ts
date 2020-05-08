import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AggregationState } from '@monitoring/store/aggregation.state';
import { ChecksAggregationResponse } from '@monitoring/models';
import { Aggregation, AggregationsList } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import { AggregationPaginator } from '@monitoring/services/aggregation-paginator';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { isEqual } from 'lodash';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  timer,
  Subject,
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  tap,
  shareReplay,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AggregationFacade implements OnDestroy {
  private readonly aggregations$: Observable<AggregationsList>;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private monitoringPageFacade: MonitoringPageFacade,
    private monitoring: MonitoringService,
    private paginator: AggregationPaginator,
    private state: AggregationState
  ) {
    this.aggregations$ = this.state.getAggregations().pipe(
      filter(val => val !== null),
      shareReplay(1)
    );

    this.aggregations$
      .pipe(
        withLatestFrom(this.monitoringPageFacade.getAggregation()),
        tap(([aggregations, currentSelectedAggregation]) => {
          if (aggregations === null || aggregations.totalRequests === 0) {
            this.selectAggregation(null);
            return;
          }
          if (
            currentSelectedAggregation === null ||
            !aggregations.has(currentSelectedAggregation)
          ) {
            this.selectAggregation(aggregations.lastAggregation);
            return;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSelectedAggregation(): Observable<Aggregation> {
    return this.monitoringPageFacade
      .getAggregation()
      .pipe(filter(val => val !== null));
  }
  selectAggregation(agg: Aggregation): void {
    this.monitoringPageFacade.selectAggregation(agg);
  }

  loadAggregations(): void {
    combineLatest(
      this.monitoringPageFacade.getModelVersion(),
      this.state.getOffset()
    )
      .pipe(
        switchMap(([modelVersion, offset]) => {
          return timer(0, 5000).pipe(
            switchMap(() => {
              return this.monitoring
                .getChecksAggregation({
                  limit: 80,
                  modelVersionId: modelVersion.id,
                  offset,
                })
                .pipe(
                  catchError(err => {
                    this.state.setError(err);

                    return of(null);
                  })
                );
            }),
            startWith(null),
            pairwise<ChecksAggregationResponse>(),
            filter(([prev, cur]) => {
              return !isEqual(prev, cur);
            }),
            map(([_, cur]) => cur),
            map(({ count, results }) => {
              const aggregations = results
                .map(aggregation => new Aggregation(aggregation))
                .reverse();
              this.state.addAggregations(
                new AggregationsList(aggregations, count)
              );
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  canLoadRight(): Observable<boolean> {
    return this.state
      .getOffset()
      .pipe(map(offset => this.paginator.canLoadNewest(offset)));
  }

  canLoadLeft(): Observable<boolean> {
    return combineLatest([
      this.aggregations$,
      this.state.getOffset(),
      of(10),
    ]).pipe(
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

  getAggregations(): Observable<AggregationsList> {
    return this.aggregations$;
  }

  loadOlder(): void {
    this.state.setOffset(1);
  }

  loadNewest(): void {
    this.state.setOffset(-1);
  }

  getError(): Observable<string | null> {
    return this.state.getError();
  }
}
