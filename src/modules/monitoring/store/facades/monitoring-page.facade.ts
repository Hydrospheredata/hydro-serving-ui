import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import {
  Check,
  ChecksAggregationItem,
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
  pairwise,
  pluck,
  refCount,
  publishReplay,
  startWith,
  tap,
} from 'rxjs/operators';
import { AggregationPaginator } from '../../services/aggregation-paginator';

@Injectable()
export class MonitoringPageFacade {
  groupedBy$: BehaviorSubject<number> = new BehaviorSubject(10);
  currentOffset$: BehaviorSubject<number> = new BehaviorSubject(0);
  aggregationLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
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
  checksAggregationResponse$: Observable<
    ChecksAggregationResponse
  > = combineLatest(this.modelVersion$, this.currentOffset$).pipe(
    switchMap(([modelVersion, offset]) => {
      return timer(0, 5000).pipe(
        switchMap(() => {
          this.aggregationLoading$.next(true);
          return this.monitoring
            .getChecksAggregation({
              limit: this.limit,
              modelVersionId: modelVersion.id,
              offset,
            })
            .pipe(
              catchError(err => {
                this.aggregationLoading$.next(false);
                this.error$.next(err);
                return of({}) as Observable<ChecksAggregationResponse>;
              })
            );
        }),
        tap(() => {
          this.aggregationLoading$.next(false);
        }),
        startWith({ results: [], count: 0 }),
        pairwise(),
        filter(([prev, cur]) => {
          return !isEqual(prev, cur);
        }),
        map(([_, cur]) => cur)
      );
    }),
    publishReplay(),
    refCount()
  );

  requestsCount$: Observable<number> = this.checksAggregationResponse$.pipe(
    pluck('count')
  );

  receivedRequestCount$: Observable<
    number
  > = this.checksAggregationResponse$.pipe(
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

  checksAggregations$ = combineLatest(this.checksAggregationResponse$, this.selectedMetrics$).pipe(
    map(([aggregationResponse, metrics]) => {
      if (aggregationResponse.results === undefined) {
        return [];
      }
      return aggregationResponse.results
        .map(rawCheck => this.checkAggBuilder.build(rawCheck, metrics))
        .reverse();
    })
  );

  canLoadRight$: Observable<boolean> = this.currentOffset$.pipe(
    map(offset => this.paginator.canLoadNewest(offset))
  );
  canLoadLeft$: Observable<boolean> = combineLatest(
    this.requestsCount$,
    this.receivedRequestCount$,
    this.currentOffset$,
    this.groupedBy$
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

  selectedColumnId$ = new Subject<string>();
  selectedAggregation$ = combineLatest(
    this.checksAggregations$,
    this.selectedColumnId$
  ).pipe(
    map(([agg, id]) => {
      let res: ChecksAggregationItem;
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
      this.detailedLoading$.next(true);
      return this.monitoring.getChecks({
        modelVersionId,
        from,
        to,
      });
    }),
    tap(() => this.detailedLoading$.next(false)),
    catchError(err => {
      this.detailedLoading$.next(false);
      return of({});
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
  private limit: number = 60;

  constructor(
    private store: Store<State>,
    private modelsFacade: ModelsFacade,
    private monitoring: MonitoringService,
    private checkAggBuilder: CheckAggregationBuilder,
    private paginator: AggregationPaginator
  ) { }
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
