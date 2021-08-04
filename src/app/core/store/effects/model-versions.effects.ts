import { ModelDTO, Model, ModelVersionStatus } from '@app/core/data/types';
import { Injectable } from '@angular/core';
import { FavoriteService } from '@app/core/favorite.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, concat } from 'rxjs';
import {
  catchError,
  switchMap,
  exhaustMap,
  withLatestFrom,
  map,
} from 'rxjs/operators';
import * as _ from 'lodash';

import { SnackbarService } from '../../snackbar.service';

import { ModelBuilder, ModelVersionBuilder } from '../../data/builders';
import { ModelVersionService } from '../../data/services/model-version.service';

import { HydroServingState } from '../states/root.state';
import { selectAllModels } from '../selectors/models.selectors';
import { AddModel, GetModelsSuccess } from '../actions/models.actions';
import {
  GetModelVersions,
  GetModelVersionsSuccess,
  GetModelVersionsFail,
  AddModelVersion,
  DeleteModelVersionSuccess,
  UpsertModelVersion,
} from '../actions/model-versions.actions';
import {
  NotifyError,
  NotifySuccess,
  NotifyWarning,
} from '../actions/notifications.actions';

@Injectable()
export class ModelVersionsEffects {
  getAllVersions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetModelVersions),
      switchMap(() =>
        this.modelVersionsService.getAllVersions().pipe(
          switchMap(data => {
            const modelVersions = data.map(
              this.modelVersionBuilder.build,
              this.modelVersionBuilder,
            );

            const models: Model[] = _.uniqBy(
              modelVersions.map(mv => mv.model),
              function (model: ModelDTO) {
                return model.id;
              },
            )
              .map(this.modelBuilder.build, this.modelBuilder)
              .map(model => {
                return {
                  ...model,
                  favorite: this.favoriteService.isFavorite(model.name),
                };
              });

            return of(
              GetModelVersionsSuccess({ payload: modelVersions }),
              GetModelsSuccess({ payload: models }),
            );
          }),
          catchError(error => {
            console.error(error);

            return of(
              GetModelVersionsFail({ error }),
              NotifyError('Failed to load model versions'),
            );
          }),
        ),
      ),
    ),
  );

  addModelVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddModelVersion),
      withLatestFrom(this.store.pipe(select(selectAllModels))),
      exhaustMap(([{ modelVersion }, models]) => {
        const modelExist = models.some(
          model => model.name === modelVersion.model.name,
        );

        if (modelExist) {
          return of(UpsertModelVersion({ modelVersion }));
        } else {
          const model = this.modelBuilder.build(modelVersion.model);

          return concat(
            of(AddModel({ model })),
            of(UpsertModelVersion({ modelVersion })),
          );
        }
      }),
    ),
  );

  upsertModelVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpsertModelVersion),
      map(({ modelVersion }) => {
        switch (modelVersion.status) {
          case ModelVersionStatus.Failed:
            return NotifyError(
              `Model version: ${modelVersion.nameWithId()} failed`,
            );

          case ModelVersionStatus.Released:
            return NotifySuccess(
              `Model version: ${modelVersion.nameWithId()} has been released`,
            );
          default:
            return { type: 'NOOP' };
        }
      }),
    ),
  );

  deleteModelVersionsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteModelVersionSuccess),
      switchMap(_ => of(NotifyWarning(`Model version: ${_} has been deleted`))),
    ),
  );

  constructor(
    private modelBuilder: ModelBuilder,
    private modelVersionBuilder: ModelVersionBuilder,
    private modelVersionsService: ModelVersionService,
    private actions$: Actions,
    private snackbar: SnackbarService,
    private store: Store<HydroServingState>,
    private favoriteService: FavoriteService,
  ) {}
}
