import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Check, CheckCollection } from '@monitoring/models';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import {
  AddMetric,
  DeleteMetric,
  GetServiceStatusAction,
  LoadMetrics,
} from '@monitoring/store/actions';
import { State } from '@monitoring/store/reducers';
import {
  getMonitoringServiceError,
  getMonitoringServiceStatus,
  selectSelectedMetrics,
} from '@monitoring/store/selectors';
import { select, Store } from '@ngrx/store';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';

@Injectable()
export class MonitoringPageFacade {
  detailedLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  siblingModelVersions$ = this.modelsFacade.siblingModelVersions$;
  serviceStatus$ = this.store.pipe(select(getMonitoringServiceStatus));
  serviceStatusError$ = this.store.pipe(select(getMonitoringServiceError));
  modelVersion$ = this.modelsFacade.selectedModelVersion$;

  selectedMetrics$ = this.store.pipe(
    select(selectSelectedMetrics),
    filter(val => val !== undefined),
    shareReplay(1)
  );
  customMetrics$ = this.selectedMetrics$.pipe(
    map(metrics => metrics.filter(isCustomMetric))
  );

  private _checks$: any;
  private error: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private selectedAggregation: BehaviorSubject<
    Aggregation
  > = new BehaviorSubject(null);

  constructor(
    private store: Store<State>,
    private modelsFacade: ModelsFacade,
    private monitoring: MonitoringService
  ) {
    this._checks$ = this.selectedAggregation$().pipe(
      filter(val => !!val),
      exhaustMap(aggregation => {
        const { from, to, modelVersionId } = aggregation;
        this.detailedLoading$.next(true);
        return this.monitoring.getChecks({
          modelVersionId,
          from,
          to,
        });
      }),
      map(bareChecks => {
        const checks = bareChecks.map(bareCheck => new Check(bareCheck));
        return new CheckCollection(checks);
      }),
      tap(() => this.detailedLoading$.next(false)),
      catchError(() => {
        this.error.next('something goes wrong');
        this.detailedLoading$.next(false);
        return of([] as Check[]);
      }),
      shareReplay(1)
    );
  }

  error$(): Observable<string | null> {
    return this.error.asObservable();
  }

  selectedAggregation$(): Observable<Aggregation | null> {
    return this.selectedAggregation.asObservable();
  }

  checks$(): Observable<CheckCollection> {
    return this._checks$;
  }

  loadMetrics(): void {
    this.store.dispatch(LoadMetrics());
  }

  deleteMetric(id: string): void {
    this.store.dispatch(DeleteMetric({ id }));
  }

  addMetric(metric: any): void {
    this.store.dispatch(AddMetric({ aggregation: metric }));
  }

  getServiceStatus(): void {
    this.store.dispatch(GetServiceStatusAction());
  }

  selectAggregation(agg: Aggregation): void {
    this.selectedAggregation.next(agg);
  }
}

const isCustomMetric = (metric: MetricSpecification): boolean => {
  const systemMetrics = new Set([
    'fake-id-error-rate',
    'fake-id-latency',
    'fake-id-counter',
  ]);

  return !systemMetrics.has(metric.id);
};
