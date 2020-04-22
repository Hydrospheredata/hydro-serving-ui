import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Check, ChecksAggregationItem } from '@monitoring/interfaces';
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
import { isNumber } from 'lodash';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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
  error$ = new Subject();
  siblingModelVersions$ = this.modelsFacade.siblingModelVersions$;
  serviceStatus$ = this.store.pipe(select(getMonitoringServiceStatus));
  serviceStatusError$ = this.store.pipe(select(getMonitoringServiceError));
  modelVersion$ = this.modelsFacade.selectedModelVersion$;
  selectedMetrics$ = this.store.pipe(
    select(selectSelectedMetrics),
    filter(val => val !== undefined)
  );
  customMetrics$ = this.selectedMetrics$.pipe(
    map(metrics => metrics.filter(isCustomMetric))
  );

  selectedAggregation$: Observable<ChecksAggregationItem>;
  checks$: Observable<any>;
  latency$: Observable<any>;
  errorsChecks$: Observable<any>;

  private selectedAggregation: BehaviorSubject<ChecksAggregationItem>;

  constructor(
    private store: Store<State>,
    private modelsFacade: ModelsFacade,
    private monitoring: MonitoringService
  ) {
    this.selectedAggregation = new BehaviorSubject(null);
    this.selectedAggregation$ = this.selectedAggregation
      .asObservable()
      .pipe(shareReplay(1));

    this.checks$ = this.selectedAggregation$.pipe(
      filter(val => !!val),
      exhaustMap(aggregation => {
        const {
          _hs_first_id: from,
          _hs_last_id: to,
          _hs_model_version_id: modelVersionId,
        } = aggregation.additionalInfo;
        this.detailedLoading$.next(true);
        return this.monitoring.getChecks({
          modelVersionId,
          from,
          to,
        });
      }),
      tap(() => this.detailedLoading$.next(false)),
      catchError(() => {
        this.detailedLoading$.next(false);
        return of([] as Check[]);
      }),
      shareReplay(1)
    );
    this.latency$ = this.checks$.pipe(
      map(checks => {
        const getLatencyField = (check: Check) => check._hs_latency;
        return checks.map(getLatencyField).filter(isNumber);
      }),
      shareReplay(1)
    );
    this.errorsChecks$ = this.checks$.pipe(
      map(checks => {
        const getErrorField = (check: Check) => check._hs_error;
        return checks.map(getErrorField) || [];
      }),
      filter(val => val !== undefined),
      shareReplay(1)
    );
  }

  loadMetrics(): void {
    this.store.dispatch(LoadMetrics());
  }

  deleteMetric(id: string) {
    this.store.dispatch(DeleteMetric({ id }));
  }

  addMetric(metric: any) {
    this.store.dispatch(AddMetric({ aggregation: metric }));
  }

  getServiceStatus() {
    this.store.dispatch(GetServiceStatusAction());
  }

  selectAggregation(agg: ChecksAggregationItem): void {
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
