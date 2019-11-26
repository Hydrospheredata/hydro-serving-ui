import { Injectable } from '@angular/core';
import { SnackbarService } from '@core/services';
import { HydroServingState } from '@core/store';
import { selectSelectedModelVersion } from '@models/store';
import { MetricsService } from '@monitoring/services';
import {
  LoadMetrics,
  LoadMetricsSuccess,
  LoadMetricsFail,
  AddMetric,
  AddMetricSuccess,
  AddMetricFail,
  DeleteMetric,
  DeleteMetricSuccess,
  DeleteMetricFail,
} from '@monitoring/store/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class MetricsEffects {
  addMetric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddMetric),
      switchMap(action =>
        this.metricsService.addMetricSpecification(action.aggreagation).pipe(
          map(response => {
            this.snackbar.show({
              message: 'Metric was successfully added',
            });
            return AddMetricSuccess({
              payload: new MetricSpecification(response),
            });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(AddMetricFail({ error }));
          })
        )
      )
    )
  );

  deleteMetric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteMetric),
      switchMap(({ id }) => {
        return this.metricsService.deleteMetricSpecification(id).pipe(
          map(() => DeleteMetricSuccess({ payload: { id } })),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(DeleteMetricFail({ error }));
          })
        );
      })
    )
  );

  loadMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadMetrics),
      withLatestFrom(this.store.pipe(select(selectSelectedModelVersion))),
      switchMap(([, { id }]) => {
        return this.metricsService.getMetricSpecifications(`${id}`).pipe(
          map(metricSettings =>
            LoadMetricsSuccess({ payload: metricSettings })
          ),
          catchError(error => of(LoadMetricsFail({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private metricsService: MetricsService,
    private store: Store<HydroServingState>,
    private snackbar: SnackbarService
  ) {}
}
