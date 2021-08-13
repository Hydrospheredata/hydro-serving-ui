import { Injectable } from '@angular/core';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { SnackbarService } from '@app/core/snackbar.service';
import { HydroServingState } from '@app/core/store/states/root.state';

import { MetricsService } from '../../services';
import {
  LoadMetrics,
  LoadMetricsSuccess,
  LoadMetricsFail,
  AddMetric,
  AddMetricSuccess,
  DeleteMetric,
  DeleteMetricSuccess,
  DeleteMetricFail,
} from '../../store/actions';

import { MetricSpecification } from '@app/core/data/types';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Notify } from '@app/core/store/actions/notifications.actions';

@Injectable()
export class MetricsEffects {
  addMetric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddMetric),
      switchMap(action =>
        this.metricsService.addMetricSpecification(action.aggregation).pipe(
          switchMap(response => {
            return [
              AddMetricSuccess({
                payload: new MetricSpecification(response),
              }),
              Notify({
                kind: 'success',
                message: 'Metric was successfully added',
              }),
            ];
          }),
        ),
      ),
    ),
  );

  deleteMetric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteMetric),
      switchMap(({ id }) => {
        return this.metricsService.deleteMetricSpecification(id).pipe(
          switchMap(() => {
            return [
              DeleteMetricSuccess({ payload: { id } }),
              Notify({
                kind: 'warning',
                message: 'Metric has been deleted',
              }),
            ];
          }),
          catchError(error => {
            return of(
              DeleteMetricFail({ error }),
              Notify({ kind: 'error', message: `Error: ${error}` }),
            );
          }),
        );
      }),
    ),
  );

  loadMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadMetrics),
      switchMap(() => this.modelVersionsFacade.selectedModelVersion()),
      switchMap(({ id }) => {
        return this.metricsService.getMetricSpecifications(`${id}`).pipe(
          map(metricSettings =>
            LoadMetricsSuccess({ payload: metricSettings }),
          ),
          catchError(error =>
            of(
              LoadMetricsFail({ error }),
              Notify({ kind: 'error', message: "Couldn't load metrics" }),
            ),
          ),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private metricsService: MetricsService,
    private modelVersionsFacade: ModelVersionsFacade,
    private store: Store<HydroServingState>,
    private snackbar: SnackbarService,
  ) {}
}
