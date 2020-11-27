import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/internal/operators';

import { SnackbarService } from '../../snackbar.service';

import { DeploymentConfigsService } from '../../data/services/deployment-configs.service';
import {
  GetDeploymentConfigs,
  GetDeploymentConfigsSuccess,
  DeleteDeploymentConfig,
  DeleteDeploymentConfigSuccess,
  DeleteDeploymentConfigFail,
} from '../actions/deployment-configs.actions';

@Injectable()
export class DeploymentConfigsEffects {
  getAllDeploymentConfigs = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDeploymentConfigs),
      exhaustMap(() =>
        this.api
          .getAll()
          .pipe(map(configs => GetDeploymentConfigsSuccess({ configs })))
      )
    )
  );

  deleteConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteDeploymentConfig),
      exhaustMap(({ name }) =>
        this.api.delete(name).pipe(
          map(() => {
            this.snackbar.show({
              message: 'Deployment config was successfully deleted',
            });
            return DeleteDeploymentConfigSuccess({ name });
          }),
          catchError(err => {
            this.snackbar.show({
              message: err.message,
            });
            return of(DeleteDeploymentConfigFail());
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: DeploymentConfigsService,
    private readonly snackbar: SnackbarService
  ) {}
}
