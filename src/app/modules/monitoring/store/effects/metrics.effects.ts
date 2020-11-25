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
  AddMetricFail,
  DeleteMetric,
  DeleteMetricSuccess,
  DeleteMetricFail,
} from '../../store/actions';

import { MetricSpecification } from '@app/core/data/types';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class MetricsEffects {
  addMetric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddMetric),
      switchMap(action =>
        this.metricsService.addMetricSpecification(action.aggregation).pipe(
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
          map(() => {
            this.snackbar.show({ message: 'Metric was deleted' });
            return DeleteMetricSuccess({ payload: { id } });
          }),
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
      switchMap(() => this.modelVersionsFacade.selectedModelVersion()),
      switchMap(({ id }) => {
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
    private modelVersionsFacade: ModelVersionsFacade,
    private store: Store<HydroServingState>,
    private snackbar: SnackbarService
  ) {}
}
