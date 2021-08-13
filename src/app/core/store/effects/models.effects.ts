import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '@app/core/favorite.service';
import { tap } from 'rxjs/operators';

import { ModelService } from '../../data/services/model.service';

import { SnackbarService } from '../../snackbar.service';
import { ModelBuilder } from '../../data/builders';

import {
  GetModels,
  GetModelsSuccess,
  GetModelsFail,
  DeleteModel,
  DeleteModelSuccess,
  DeleteModelFail,
  ToggleFavorite,
} from '../actions/models.actions';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NotifyError, NotifyWarning } from '../actions/notifications.actions';

@Injectable()
export class ModelsEffects {
  getAllModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetModels),
      switchMap(() =>
        this.modelsService.getModels().pipe(
          map(data => {
            const models = data
              .map(this.modelBuilder.build, this.modelBuilder)
              .map(model => {
                return {
                  ...model,
                  favorite: this.favoriteService.isFavorite(model.name),
                };
              });
            return GetModelsSuccess({ payload: models });
          }),
          catchError(error => {
            return of(
              GetModelsFail({ error }),
              NotifyError('Failed to load models'),
            );
          }),
        ),
      ),
    ),
  );

  deleteModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteModel),
      switchMap(({ modelId }) => {
        return this.modelsService.deleteModel(modelId).pipe(
          switchMap(() => {
            this.router.navigate(['models']);
            return [
              DeleteModelSuccess({ modelId }),
              NotifyWarning('Model has been deleted'),
            ];
          }),
          catchError(error => {
            return of(
              DeleteModelFail({ error }),
              NotifyError(`Error: ${error}`),
            );
          }),
        );
      }),
    ),
  );

  toggleFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToggleFavorite),
        tap(({ model }) => {
          model.favorite
            ? this.favoriteService.remove(model.name)
            : this.favoriteService.add(model.name);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private modelBuilder: ModelBuilder,
    private modelsService: ModelService,
    private actions$: Actions,
    private snackbar: SnackbarService,
    private router: Router,
    private favoriteService: FavoriteService,
    private norufierService: NotifierService,
  ) {}
}
