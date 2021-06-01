import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { exhaustMap, map, catchError } from 'rxjs/internal/operators';

import { SnackbarService } from '../../snackbar.service';

import { DeploymentConfigsService } from '../../data/services/deployment-configs.service';
import {
  GetDeploymentConfigs,
  GetDeploymentConfigsSuccess,
  DeleteDeploymentConfig,
  DeleteDeploymentConfigSuccess,
  DeleteDeploymentConfigFail,
  AddDeploymentConfig,
  AddDeploymentConfigSuccess,
  AddDeploymentConfigFail,
} from '../actions/deployment-configs.actions';

@Injectable()
export class DeploymentConfigsEffects {
  getAllDeploymentConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDeploymentConfigs),
      exhaustMap(() =>
        this.depConfigsService
          .getAll()
          .pipe(
            map(configs => GetDeploymentConfigsSuccess({ payload: configs }))
          )
      )
    )
  );

  addConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddDeploymentConfig),
      switchMap(({ depConfig }) => {
        return this.depConfigsService.addConfig(depConfig).pipe(
          map(response => {
            this.snackbar.show({
              message: 'Deployment config was successfully added',
            });

            this.router.navigate(['/deployment_configs', response.name]);
            return AddDeploymentConfigSuccess({ payload: depConfig });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(AddDeploymentConfigFail({ error }));
          })
        );
      })
    )
  );

  deleteConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteDeploymentConfig),
      exhaustMap(({ name }) =>
        this.depConfigsService.delete(name).pipe(
          map(() => {
            this.router.navigate(['deployment_configs']);
            this.snackbar.show({
              message: 'Deployment config was successfully deleted',
            });
            return DeleteDeploymentConfigSuccess({ name });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(DeleteDeploymentConfigFail({ error }));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private readonly depConfigsService: DeploymentConfigsService,
    private readonly snackbar: SnackbarService
  ) {}
}
