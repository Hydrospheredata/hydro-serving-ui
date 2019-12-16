import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import {
  Check,
  ChecksAggregation,
  CustomCheck,
  ChecksAggregationResponse,
} from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { CheckAggregationBuilder } from '@monitoring/services/builders/check-aggregation.builder';
import {
  LoadMetrics,
  DeleteMetric,
  AddMetric,
  GetServiceStatusAction,
} from '@monitoring/store/actions';
import { State } from '@monitoring/store/reducers';
import {
  getMonitoringServiceError,
  getMonitoringServiceStatus,
  selectSelectedMetrics,
} from '@monitoring/store/selectors';
import { Store, select } from '@ngrx/store';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { isNumber, isEqual } from 'lodash';
import {
  Subject,
  combineLatest,
  of,
  Observable,
  timer,
  BehaviorSubject,
} from 'rxjs';
import {
  filter,
  switchMap,
  share,
  map,
  exhaustMap,
  catchError,
  startWith,
  pairwise,
  tap,
} from 'rxjs/operators';

@Injectable()
export class MonitoringPageFacade {
  requestsCount$: Subject<number> = new Subject();
  receivedRequestCount$: Subject<number> = new Subject();
  receivedColumnsCount$: Subject<number> = new Subject();
  currentOffset$: BehaviorSubject<number> = new BehaviorSubject(0);
  elementsPerColumn$: Subject<number> = new BehaviorSubject(10);

  canLoadLeft$: Observable<boolean> = combineLatest(
    this.requestsCount$,
    this.receivedRequestCount$,
    this.receivedColumnsCount$,
    this.currentOffset$,
    this.elementsPerColumn$
  ).pipe(
    map(([total, current, columns, offset, elPerColumn]) => {
      const res = total > (columns + offset) * elPerColumn;
      return res;
    }),
    startWith(false)
  );
  canLoadRight$: Observable<boolean> = combineLatest(
    this.requestsCount$,
    this.receivedRequestCount$,
    this.currentOffset$
  ).pipe(
    map(([total, current, offset]) => {
      return offset !== 0;
    }),
    startWith(false)
  );

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
  detailedLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  checksAggregations$: Observable<ChecksAggregation[]> = combineLatest(
    this.modelVersion$,
    this.customMetrics$,
    this.currentOffset$
  ).pipe(
    switchMap(([modelVersion, metrics, offset]) => {
      return timer(0, 5000).pipe(
        switchMap(() => {
          this.detailedLoading$.next(true);
          return this.monitoring
            .getChecksAggregation({
              modelVersionId: modelVersion.id,
              offset,
            })
            .pipe(
              catchError(err => {
                this.detailedLoading$.next(false);
                this.error$.next(err);
                return of([]);
              })
            );
        }),
        startWith({}),
        pairwise(),
        filter(([prev, cur]) => {
          return !isEqual(prev, cur);
        }),
        map(([_, currentRes]) => {
          const res = currentRes as ChecksAggregationResponse;
          if (res.results === undefined) {
            return [];
          }

          this.requestsCount$.next(res.count);
          this.receivedRequestCount$.next(
            res.results.reduce((x, el) => x + el._hs_requests, 0)
          );
          this.receivedColumnsCount$.next(res.results.length);

          return res.results
            .map(rawCheck => this.checkAggBuilder.build(rawCheck, metrics))
            .reverse();
        }),
        tap(() => {
          this.detailedLoading$.next(false);
        })
      );
    }),
    share()
  );

  selectedColumnId$ = new Subject<string>();
  selectedAggregation$ = combineLatest(
    this.checksAggregations$,
    this.selectedColumnId$
  ).pipe(
    map(([agg, id]) => {
      let res: ChecksAggregation;
      if (id) {
        res = agg.find(a => a.additionalInfo._id === id);
      }

      if (res === undefined) {
        res = agg[agg.length - 1];
      }

      return res;
    }),
    share()
  );

  checks$ = this.selectedAggregation$.pipe(
    exhaustMap(aggregation => {
      const {
        _hs_first_id: from,
        _hs_last_id: to,
        _hs_model_version_id: modelVersionId,
      } = aggregation.additionalInfo;

      return this.monitoring.getChecks({
        modelVersionId,
        from,
        to,
      });
    }),
    share()
  );

  latency$ = this.checks$.pipe(
    map(checks => {
      const getLatencyField = (check: Check) => check._hs_latency;
      return checks.map(getLatencyField).filter(isNumber);
    }),
    share()
  );
  errorsChecks$ = this.checks$.pipe(
    map(checks => {
      const getErrorField = (check: Check) => check._hs_error;
      return checks.map(getErrorField) || [];
    }),
    filter(val => val !== undefined),
    share()
  );
  customChecks$ = combineLatest(this.checks$, this.customMetrics$).pipe(
    map(([checks, metrics]) => {
      const rawMetrics: Array<[string, CustomCheck]> = metrics.map(
        ({ id, name, config: { threshold } }) =>
          [id, { data: [], name, threshold, health: [] }] as [
            string,
            CustomCheck
          ]
      );

      const customChecks: Map<string, CustomCheck> = new Map(rawMetrics);

      const updateValue = (check: CustomCheck, value, health) => {
        return {
          ...check,
          data: [...check.data, value],
          health: [...check.health, health],
        };
      };

      checks.forEach(check => {
        const overall = Object.values(check._hs_metric_checks || {});
        overall.forEach(({ metricSpecId, value, check: health }) => {
          if (customChecks.has(metricSpecId)) {
            customChecks.set(
              metricSpecId,
              updateValue(customChecks.get(metricSpecId), value, health)
            );
          }
        });
      });

      return customChecks;
    }),
    share()
  );
  private limit: number = 10;

  constructor(
    private store: Store<State>,
    private modelsFacade: ModelsFacade,
    private monitoring: MonitoringService,
    private checkAggBuilder: CheckAggregationBuilder
  ) {}
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

  selectAggregationColumn(id: string) {
    this.selectedColumnId$.next(id);
  }

  loadOlder() {
    this.currentOffset$.next(this.currentOffset$.value + 1);
  }

  loadNewest(offset: number = 0) {
    this.currentOffset$.next(this.currentOffset$.value - 1);
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
