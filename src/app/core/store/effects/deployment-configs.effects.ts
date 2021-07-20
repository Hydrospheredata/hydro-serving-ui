import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { exhaustMap, map, catchError } from 'rxjs/operators';

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
  ToggleFavorite,
} from '../actions/deployment-configs.actions';
import { FavoriteService } from '@app/core/favorite.service';

@Injectable()
export class DeploymentConfigsEffects {
  getAllDeploymentConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDeploymentConfigs),
      switchMap(() =>
        this.depConfigsService.getAll().pipe(
          map(res => {
            const configs = res.map(config => {
              return {
                ...config,
                favorite: this.favoriteService.isFavorite(config.name),
              };
            });
            return GetDeploymentConfigsSuccess({ payload: configs });
          }),
        ),
      ),
    ),
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
          }),
        );
      }),
    ),
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
          }),
        ),
      ),
    ),
  );

  toggleFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToggleFavorite),
        tap(({ payload: { depConfig } }) => {
          depConfig.favorite
            ? this.favoriteService.remove(depConfig.name)
            : this.favoriteService.add(depConfig.name);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private readonly depConfigsService: DeploymentConfigsService,
    private readonly snackbar: SnackbarService,
    private favoriteService: FavoriteService,
  ) {}
}
