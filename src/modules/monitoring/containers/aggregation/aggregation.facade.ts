import { Injectable, OnDestroy } from '@angular/core';
import { ChecksAggregationResponse } from '@monitoring/models';
import { AggregationState } from '@monitoring/store/aggregation.state';
import { Aggregation, AggregationsList } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import { AggregationPaginator } from '@monitoring/services/aggregation-paginator';
import { MonitoringPageFacade } from '@monitoring/store/facades';
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
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AggregationFacade implements OnDestroy {
  private readonly aggregations$: Observable<AggregationsList>;
  private readonly limit: number = 80;
  private readonly interval: number = 5000;
  private readonly groupedBy: number = 10;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private monitoringPageFacade: MonitoringPageFacade,
    private monitoringApi: MonitoringService,
    private paginator: AggregationPaginator,
    private state: AggregationState
  ) {
    this.aggregations$ = this.state
      .getAggregations()
      .pipe(neitherNullNorUndefined, shareReplay(1));

    this.checkSelectedAggregation();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSelectedAggregation(): Observable<Aggregation> {
    return this.monitoringPageFacade
      .getAggregation()
      .pipe(neitherNullNorUndefined);
  }

  selectAggregation(agg: Aggregation): void {
    this.monitoringPageFacade.selectAggregation(agg);
  }

  loadAggregations(): void {
    combineLatest([
      this.monitoringPageFacade.getModelVersion(),
      this.state.getOffset(),
    ])
      .pipe(
        switchMap(([modelVersion, offset]) => {
          return timer(0, this.interval).pipe(
            switchMap(() => {
              return this.monitoringApi
                .getChecksAggregation({
                  limit: this.limit,
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
            neitherNullNorUndefined,
            distinctUntilChanged<ChecksAggregationResponse>(
              (prev, cur) => cur.count === prev.count
            ),
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
    return combineLatest([this.aggregations$, this.state.getOffset()]).pipe(
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

  private checkSelectedAggregation() {
    this.aggregations$
      .pipe(
        neitherNullNorUndefined,
        withLatestFrom(this.monitoringPageFacade.getAggregation()),
        tap(([aggregations, currentSelectedAggregation]) => {
          if (aggregations.totalRequests === 0) {
            this.selectAggregation(null);
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
}
