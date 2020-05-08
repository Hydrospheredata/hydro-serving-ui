import { Injectable } from '@angular/core';
import { AggregationState } from '@monitoring/aggregation.state';
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
  shareReplay,
  take,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AggregationFacade {
  groupedBy$: BehaviorSubject<number> = new BehaviorSubject(10);

  canLoadRight$: Observable<boolean>;
  canLoadLeft$: Observable<boolean>;

  private readonly aggregations$: Observable<AggregationsList>;

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
        tap(console.log),
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
            map(res => {
              const { count, results } = res;
              const aggregations = results
                .map(aggregation => new Aggregation(aggregation))
                .reverse();
              this.state.addAggregations(
                new AggregationsList(aggregations, count)
              );
            })
          );
        })
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
