import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
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
  SseAddDeploymentConfigEvent,
  SseDeleteDeploymentConfigEvent,
} from '../actions/deployment-configs.actions';
import { FavoriteService } from '@app/core/favorite.service';
import {
  NotifyError,
  NotifySuccess,
  NotifyWarning,
} from '../actions/notifications.actions';
import { Store } from '@ngrx/store';

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
          concatMap(depConfig => {
            this.router.navigate(['/deployment_configs', depConfig.name]);

            return [{ type: 'NOOP' }];
          }),
          catchError(error => {
            return of(
              AddDeploymentConfigFail({ error }),
              NotifyError(`Error: ${error}`),
            );
          }),
        );
      }),
    ),
  );

  sseAddEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(SseAddDeploymentConfigEvent),
      switchMap(({ depConfig }) =>
        of(AddDeploymentConfigSuccess({ payload: depConfig })),
      ),
    ),
  );

  addSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddDeploymentConfigSuccess),
      switchMap(({ payload: depConfig }) =>
        of(
          NotifySuccess(
            `Deployment config: ${depConfig.name} was successfully added`,
          ),
        ),
      ),
    ),
  );

  deleteConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteDeploymentConfig),
      exhaustMap(({ name }) =>
        this.depConfigsService.delete(name).pipe(
          switchMap(() => {
            this.router.navigate(['deployment_configs']);
            return [{ type: 'NOOP' }];
          }),
          catchError(error => {
            return of(
              DeleteDeploymentConfigFail({ error }),
              NotifyError(`Error: ${error}`),
            );
          }),
        ),
      ),
    ),
  );

  sseDeleteConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(SseDeleteDeploymentConfigEvent),
      switchMap(({ name }) => of(DeleteDeploymentConfigSuccess({ name }))),
    ),
  );

  deleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteDeploymentConfigSuccess),
      switchMap(({ name }) => {
        return of(NotifyWarning(`Deployment config: ${name} has been deleted`));
      }),
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
    private store: Store,
  ) {}
}
