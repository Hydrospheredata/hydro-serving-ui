import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { ComparingChartParams, Check } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
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
import { isNumber, isEmpty } from 'lodash';
import { Subject, timer, combineLatest, interval } from 'rxjs';
import {
  filter,
  switchMap,
  share,
  tap,
  takeUntil,
  map,
  exhaustMap,
} from 'rxjs/operators';

@Injectable()
export class MonitoringPageFacade {
  siblingModelVersions$ = this.modelsFacade.siblingModelVersions$;
  serviceStatus$ = this.store.pipe(select(getMonitoringServiceStatus));
  serviceStatusError$ = this.store.pipe(select(getMonitoringServiceError));
  modelVersion$ = this.modelsFacade.selectedModelVersion$;
  selectedMetrics$ = this.store.pipe(select(selectSelectedMetrics));

  checksAggreagtions$ = this.modelVersion$.pipe(
    filter(val => val !== undefined),
    switchMap(modelVersion => {
      // return timer(0, 5000).pipe(
      // return exhaustMap(() => {
      return this.monitoring.getChecksAggregation({
        modelVersionId: modelVersion.id,
      });
      // });
      // );
    }),
    tap(console.dir),
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
      } = aggregation;

      return this.monitoring.getChecks({
        modelVersionId,
        from,
        to,
      });
    }),
    tap(console.dir),
    share()
  );

  latency$ = this.checks$.pipe(
    map(checks => {
      const getLatencyField = (check: Check) => check._hs_latency;
      return checks.map(getLatencyField).filter(isNumber);
    }),
    share()
  );
  errors$ = this.checks$.pipe(
    map(checks => {
      const getErrorField = (check: Check) => check._hs_error;
      return checks.map(getErrorField) || [];
    }),
    filter(val => val !== undefined),
    share()
  );
  customChecks$ = this.checks$.pipe(
    map(checks => {
      const dict = checks.reduce((acc, check) => {
        const overall = check._hs_raw_checks.overall;
        if (isEmpty(overall.filter(el => !isEmpty(el)))) {
          return acc;
        }

        overall.forEach(rawCheck => {
          if (acc[rawCheck.metricSpecId] === undefined) {
            acc[rawCheck.metricSpecId] = {
              data: [],
              threshold: rawCheck.threshold,
              name: rawCheck.description,
            };
          }
          acc[rawCheck.metricSpecId].data.push(rawCheck.value);
        });

        return acc;
      }, {});

      return Object.values(dict);
    }),
    share()
  );

  constructor(
    private store: Store<State>,
    private modelsFacade: ModelsFacade,
    private monitoring: MonitoringService
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
