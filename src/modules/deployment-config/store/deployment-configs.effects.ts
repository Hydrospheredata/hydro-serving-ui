import { SnackbarService } from '@core/services';
import { Injectable } from '@node_modules/@angular/core';
import { Actions, createEffect, ofType } from '@node_modules/@ngrx/effects';
import { of } from '@node_modules/rxjs';
import {
  exhaustMap,
  map,
  catchError,
} from '@node_modules/rxjs/internal/operators';
import { DeploymentConfigsApiService } from '../services/deployment-configs-api.service';
import {
  GetDeploymentConfigs,
  GetDeploymentConfigsSuccess,
  DeleteDeploymentConfig,
  DeleteDeploymentConfigSuccess,
  DeleteDeploymentConfigFail,
} from './deployment-configs.actions';

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
          catchError(() => {
            this.snackbar.show({
              message: `Couldn't create deployment config`,
            });
            return of(DeleteDeploymentConfigFail());
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: DeploymentConfigsApiService,
    private readonly snackbar: SnackbarService
  ) {}
}
