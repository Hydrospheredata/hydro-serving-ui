import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Check, ChecksAggregation, CustomCheck } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { CheckAggregationBuilder } from '@monitoring/services/builders/check-aggregation.builder';
import {
  LoadMetrics,
  DeleteMetric,
  AddMetric,
  EditMetric,
  GetServiceStatusAction,
} from '@monitoring/store/actions';
import { State } from '@monitoring/store/reducers';
import {
  getMonitoringServiceError,
  getMonitoringServiceStatus,
  selectSelectedMetrics,
} from '@monitoring/store/selectors';
import { Store, select } from '@ngrx/store';
import { isNumber, isEmpty, isEqual } from 'lodash';
import { Subject, combineLatest, of, Observable, timer } from 'rxjs';
import {
  filter,
  switchMap,
  share,
  map,
  exhaustMap,
  catchError,
  startWith,
  pairwise,
} from 'rxjs/operators';

@Injectable()
export class MonitoringPageFacade {
  error$ = new Subject();
  siblingModelVersions$ = this.modelsFacade.siblingModelVersions$;
  serviceStatus$ = this.store.pipe(select(getMonitoringServiceStatus));
  serviceStatusError$ = this.store.pipe(select(getMonitoringServiceError));
  modelVersion$ = this.modelsFacade.selectedModelVersion$;
  selectedMetrics$ = this.store.pipe(select(selectSelectedMetrics));

  checksAggreagtions$: Observable<
    ChecksAggregation[]
  > = this.modelVersion$.pipe(
    switchMap(modelVersion => {
      return timer(0, 5000).pipe(
        switchMap(() => {
          return this.monitoring
            .getChecksAggregation({
              modelVersionId: modelVersion.id,
            })
            .pipe(
              catchError(err => {
                this.error$.next(err);
                return of([]);
              })
            );
        }),
        startWith([]),
        pairwise(),
        filter(([prev, cur]) => {
          return !isEqual(prev, cur);
        }),
        map(([_, currentRes]) =>
          currentRes.map(rawCheck => this.checkAggBuilder.build(rawCheck))
        )
      );
    }),
    share()
  );

  selectedColumnIndex$ = new Subject<number>();
  selectedAggregation$ = combineLatest(
    this.checksAggreagtions$,
    this.selectedColumnIndex$
  ).pipe(
    map(([agg, idx]) => agg[idx]),
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
  customChecks$ = combineLatest(this.checks$, this.selectedMetrics$).pipe(
    map(([checks, metrics]) => {
      const rawMetrics: Array<[string, CustomCheck]> = metrics
        .filter(({ id }) => isRawMetric(id))
        .map(
          ({ id, name, config: { threshold } }) =>
            [id, { data: [], name, threshold }] as [string, CustomCheck]
        );

      const customChecks: Map<string, CustomCheck> = new Map(rawMetrics);

      const updateValue = (check: CustomCheck, value) => {
        return { ...check, data: [...check.data, value] };
      };

      checks.forEach(check => {
        const overall = check._hs_raw_checks.overall;

        overall.forEach(({ metricSpecId, value }) => {
          if (customChecks.has(metricSpecId)) {
            customChecks.set(
              metricSpecId,
              updateValue(customChecks.get(metricSpecId), value)
            );
          }
        });
      });

      return customChecks.values();
    }),
    share()
  );

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
  editMetric(metric: any) {
    this.store.dispatch(EditMetric({ aggregation: metric }));
  }
  addMetric(metric: any) {
    this.store.dispatch(AddMetric({ aggreagation: metric }));
  }

  getServiceStatus() {
    this.store.dispatch(GetServiceStatusAction());
  }

  selectAggregationColumn(index: number) {
    this.selectedColumnIndex$.next(index);
  }
}

const isRawMetric = (metricId: string): boolean => {
  const systemMetrics = new Set([
    'fake-id-error-rate',
    'fake-id-latency',
    'fake-id-counter',
  ]);

  return !systemMetrics.has(metricId);
};
