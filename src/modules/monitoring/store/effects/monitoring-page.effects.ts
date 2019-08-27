import { Injectable } from '@angular/core';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { getSelectedModelVersionId } from '@models/reducers';
import { MonitoringPageService } from '@monitoring/services';
import {
  LoadMetrics,
  LoadMetricsSuccess,
  LoadMetricsFailed,
  LoadData,
  LoadFullAggregation,
  LoadFullAggregationSuccess,
  LoadFullAggregationFailed,
  LoadReqstoreData,
  LoadReqstoreDataSuccess,
  LoadReqstoreDataFailed,
  LoadSonarData,
  LoadSonarDataSuccess,
  LoadSonarDataFailed,
  LoadDetailedAggreagation,
  LoadDetailedAggregationSuccess,
  LoadDetailedAggregationFailed,
  addComparedModelVersionId,
  ComparedMetricsLoadSuccess,
  LoadComparedSonarData,
  LoadComparedSonarDataSuccess,
} from '@monitoring/store/actions';
import { State } from '@monitoring/store/reducers';
import {
  selectTimeInterval,
  selectSonarData,
  selectComparedMetricSpecifications,
  selectMetricSpecs
} from '@monitoring/store/selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, forkJoin, Observable } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter,
  concatMap,
} from 'rxjs/operators';
@Injectable()
export class MonitoringPageEffects {
  loadMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadMetrics),
      switchMap(({ modelVersionId }) =>
        this.metricSettingService.getMetricSettings(`${modelVersionId}`).pipe(
          map(metricSettings => LoadMetricsSuccess({ metricSettings })),
          catchError(error => of(LoadMetricsFailed({ error })))
        )
      )
    )
  );

  loadFullAggregation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadFullAggregation),
      withLatestFrom(this.store.pipe(select(selectMetricSpecs))),
      switchMap(([, metricSpecifications]) => {
        return this.monitoringPageService
          .loadAggregation({ metricSpecifications, timeBoundary: 0 })
          .pipe(
            map(fullAggregation =>
              LoadFullAggregationSuccess({ fullAggregation })
            ),
            catchError(error => of(LoadFullAggregationFailed({ error })))
          );
      })
    )
  );
  loadDetailedAggregation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadDetailedAggreagation),
      withLatestFrom(this.store.pipe(select(selectMetricSpecs))),
      switchMap(([action, metricSpecifications]) => {
        return this.monitoringPageService
          .loadDetailedAggregation({
            metricSpecifications,
            timeInterval: action.timeInterval,
          })
          .pipe(
            map(detailedAggregation =>
              LoadDetailedAggregationSuccess({ detailedAggregation })
            ),
            catchError(error => of(LoadDetailedAggregationFailed({ error })))
          );
      })
    )
  );

  loadData$ = createEffect(() => this.actions$.pipe(ofType(LoadData)), {
    dispatch: false,
  });

  loadReqstore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadReqstoreData),
      withLatestFrom(
        this.store.pipe(select(getSelectedModelVersionId)),
        this.store.pipe(select(selectTimeInterval))
      ),
      switchMap(([action, modelVersionId, interval]) => {
        return this.reqstoreService
          .getData({
            modelVersionId: `${modelVersionId}`,
            from: `${interval.from}`,
            till: `${interval.to}`,
            maxMessages: `${action.maxMessages}`,
            maxBytes: `${action.maxMBytes}`,
            reverse: 'true',
          })
          .pipe(
            map(result => LoadReqstoreDataSuccess({ reqstoreData: result })),
            catchError(error => of(LoadReqstoreDataFailed({ error })))
          );
      })
    )
  );

  loadSonarData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadSonarData),
      withLatestFrom(
        this.store.pipe(select(selectMetricSpecs)),
        this.store.pipe(select(selectSonarData)),
        this.store.pipe(select(selectTimeInterval))
      ),
      switchMap(([action, metricSpecs, previousSonarData, timeInterval]) => {
        let requestsMap: { [metricSpecId: string]: Observable<any> };

        // if (previousSonarData === undefined) {
        requestsMap = metricSpecs.reduce((res, cur) => {
          res[cur.id] = this.monitoringService.getMetricsInRange(cur, {
            from: `${timeInterval.from}`,
            till: `${timeInterval.to}`,
          });
          return res;
        }, {});
        // } else {
        //   requestsMap = metricSpecs.reduce((res, metricSpec) => {
        //     let lastElementTimestamp: number;
        //     const previousMetricsData = previousSonarData[metricSpec.id];

        //     if (previousMetricsData && previousMetricsData.length) {
        //       const lastElement =
        //         previousMetricsData[previousMetricsData.length - 1];
        //       lastElementTimestamp = lastElement.timestamp;
        //     }

        //     res[metricSpec.id] = this.monitoringService.getMetricsInRange(
        //       metricSpec,
        //       {
        //         from: `${lastElementTimestamp || timeInterval.from}`,
        //         till: `${timeInterval.to}`,
        //       }
        //     );

        //     return res;
        //   }, {});
        // }

        return forkJoin(requestsMap).pipe(
          map(sonarData => LoadSonarDataSuccess({ sonarData })),
          catchError(error => {
            //TODO error
            console.dir(error);
            return of(LoadSonarDataFailed({ error }));
          })
        );
      })
    )
  );

  addedComparedModelVersionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addComparedModelVersionId),
      filter(({ modelVersionId }) => modelVersionId !== undefined),
      concatMap(({ modelVersionId, metricSpecKind }) => {
        return this.metricSettingService
          .getMetricSettings(`${modelVersionId}`)
          .pipe(
            map(metrics => {
              return ComparedMetricsLoadSuccess({
                modelVersionId,
                metrics: metrics.filter(
                  metric => metric.kind === metricSpecKind
                ),
              });
            })
          );
      })
    )
  );

  loadComparedSonarData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadComparedSonarData),
      withLatestFrom(
        this.store.pipe(select(selectComparedMetricSpecifications)),
        this.store.pipe(select(selectTimeInterval))
      ),
      switchMap(([, comparedMetricSpecsByModelVersion, timeInterval]) => {
        const ents = Object.entries(comparedMetricSpecsByModelVersion);
        const metricSpecs = ents.reduce(
          (res, [, specs]) => [...res, ...specs],
          []
        );
        const requestsMap = metricSpecs.reduce((res, metricSpec) => {
          res[metricSpec.id] = this.monitoringService.getMetricsInRange(
            metricSpec,
            {
              from: `${timeInterval.from}`,
              till: `${timeInterval.to}`,
            }
          );

          return res;
        }, {});
        return forkJoin(requestsMap).pipe(
          map(sonarData =>
            LoadComparedSonarDataSuccess({ comparedSonarData: sonarData })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private monitoringPageService: MonitoringPageService,
    private metricSettingService: MetricSettingsService,
    private reqstoreService: ReqstoreService,
    private monitoringService: MonitoringService,
    private store: Store<State>
  ) {}
}
