import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '@app/core/favorite.service';
import { tap } from '@node_modules/rxjs/operators';

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
            this.snackbar.show({ message: 'Failed to load models' });
            return of(GetModelsFail({ error }));
          })
        )
      )
    )
  );

  deleteModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteModel),
      switchMap(({ modelId }) => {
        return this.modelsService.deleteModel(modelId).pipe(
          map(() => {
            this.router.navigate(['models']);
            this.snackbar.show({
              message: 'Model has been deleted',
            });
            return DeleteModelSuccess({ modelId });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(DeleteModelFail({ error }));
          })
        );
      })
    )
  );

  toggleFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToggleFavorite),
        tap(({ model }) => {
          model.favorite
            ? this.favoriteService.remove(model.name)
            : this.favoriteService.add(model.name);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private modelBuilder: ModelBuilder,
    private modelsService: ModelService,
    private actions$: Actions,
    private snackbar: SnackbarService,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}
}
