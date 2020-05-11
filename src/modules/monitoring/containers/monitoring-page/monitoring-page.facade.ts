import { Injectable, OnDestroy } from '@angular/core';
import { ModelsFacade } from '@models/store';
import {
  Check,
  CheckCollection,
  MonitoringServiceStatus,
} from '@monitoring/models';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MonitoringPageState } from '@monitoring/store/monitoring-page-state.service';
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
import { ModelVersion } from '@shared/models';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { neitherNullNorUndefined } from '@shared/utils';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, map, tap, takeUntil } from 'rxjs/operators';

@Injectable()
export class MonitoringPageFacade implements OnDestroy {
  detailedLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  serviceStatus$ = this.store.pipe(select(getMonitoringServiceStatus));

  private destroy$: Subject<any> = new Subject<any>();
  constructor(
    private store: Store<State>,
    private modelsFacade: ModelsFacade,
    private monitoring: MonitoringService,
    private monitoringPageState: MonitoringPageState
  ) {}

  loadChecks(): void {
    this.getAggregation()
      .pipe(
        neitherNullNorUndefined,
        exhaustMap(aggregation => {
          this.monitoringPageState.setChecksLoading(true);

          const { from, to, modelVersionId } = aggregation;

          return this.monitoring.getChecks({
            modelVersionId,
            from,
            to,
          });
        }),
        map(bareChecks => {
          const checks = bareChecks.map(bareCheck => new Check(bareCheck));
          return this.monitoringPageState.addChecks(
            new CheckCollection(checks)
          );
        }),
        tap(() => this.monitoringPageState.setChecksLoading(false)),
        catchError(err => {
          this.monitoringPageState.setError(err);
          this.monitoringPageState.setChecksLoading(false);

          return of(new CheckCollection([]));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getError(): Observable<string | null> {
    return this.monitoringPageState.getError();
  }

  getServiceStatus(): Observable<MonitoringServiceStatus> {
    return this.store.pipe(select(getMonitoringServiceStatus));
  }

  getSelectedMetrics(): Observable<MetricSpecification[]> {
    return this.store.pipe(
      select(selectSelectedMetrics),
      neitherNullNorUndefined
    );
  }

  getCustomMetrics(): Observable<MetricSpecification[]> {
    return this.getSelectedMetrics().pipe(
      map(metrics => metrics.filter(isCustomMetric))
    );
  }

  getServiceStatusError(): Observable<string> {
    return this.store.pipe(select(getMonitoringServiceError));
  }

  getAggregation(): Observable<Aggregation | null> {
    return this.monitoringPageState.getAggregation();
  }

  getChecks(): Observable<CheckCollection> {
    return this.monitoringPageState.getChecks();
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.modelsFacade.selectedModelVersion$;
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

  checkServiceStatus(): void {
    this.store.dispatch(GetServiceStatusAction());
  }

  selectAggregation(agg: Aggregation): void {
    this.monitoringPageState.selectAggregation(agg);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
