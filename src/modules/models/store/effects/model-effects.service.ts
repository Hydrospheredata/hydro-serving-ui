import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { ModelBuilder, ModelVersionBuilder } from '@core/builders';
import { SnackbarService } from '@core/services';
import { FavoriteStorageLocal } from '@core/services/favorite-storage-local.service';
import { HydroServingState } from '@core/store';
import { ModelsService } from '@models/services';
import { AddModelVersion, AddModel } from '../actions';
import { selectAllModels } from '../selectors';
import {
  GetModels,
  GetModelsSuccess,
  GetModelsFail,
  GetModelVersions,
  GetModelVersionsSuccess,
  DeleteModel,
  DeleteModelSuccess,
  DeleteModelFail,
  AddModelVersionSuccess,
} from '@models/store/actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@node_modules/@ngrx/store';
import { of, concat } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  exhaustMap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class ModelEffects {
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
                  favorite: this.favoriteStorage.isFavorite(model.name),
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

  getAllVersions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetModelVersions),
      switchMap(() =>
        this.modelsService.getAllVersions().pipe(
          map(data => {
            const modelVersions = data.map(
              this.modelVersionBuilder.build,
              this.modelVersionBuilder
            );
            return GetModelVersionsSuccess({ payload: modelVersions });
          }),
          catchError(error => {
            this.snackbar.show({ message: 'Failed to load model versions' });
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

  addModelVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddModelVersion),
      withLatestFrom(this.store.pipe(select(selectAllModels))),
      exhaustMap(([{ modelVersion }, models]) => {
        const modelExist = models.some(
          model => model.id === modelVersion.model.id
        );

        if (modelExist) {
          return of(AddModelVersionSuccess({ modelVersion }));
        } else {
          const model = this.modelBuilder.build(modelVersion.model);

          return concat(
            of(AddModel({ model })),
            of(AddModelVersionSuccess({ modelVersion }))
          );
        }
      })
    )
  );

  constructor(
    private modelBuilder: ModelBuilder,
    private modelVersionBuilder: ModelVersionBuilder,
    private modelsService: ModelsService,
    private actions$: Actions,
    private snackbar: SnackbarService,
    private router: Router,
    private favoriteStorage: FavoriteStorageLocal,
    private store: Store<HydroServingState>
  ) {}
}
