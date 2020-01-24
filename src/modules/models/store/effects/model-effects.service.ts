import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { ModelBuilder, ModelVersionBuilder } from '@core/builders/_index';
import { SnackbarService } from '@core/services';
import { FavoriteStorageLocal } from '@core/services/favorite-storage-local.service';
import { ModelsService } from '@models/services';
import {
  GetModels,
  GetModelsSuccess,
  GetModelsFail,
  GetModelVersions,
  GetModelVersionsSuccess,
  DeleteModel,
  DeleteModelSuccess,
  DeleteModelFail,
} from '@models/store/actions';
import { map, catchError, switchMap } from 'rxjs/operators';

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
                  favorite: this.favoriteStorage.has(model.name),
                };
              });
            return GetModelsSuccess({ payload: models });
          }),
          catchError(error => {
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
          catchError(error => of(GetModelsFail({ error })))
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

  constructor(
    private modelBuilder: ModelBuilder,
    private modelVersionBuilder: ModelVersionBuilder,
    private modelsService: ModelsService,
    private actions$: Actions,
    private snackbar: SnackbarService,
    private router: Router,
    private favoriteStorage: FavoriteStorageLocal
  ) {}
}
