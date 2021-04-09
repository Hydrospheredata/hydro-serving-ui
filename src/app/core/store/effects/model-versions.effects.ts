import { Injectable } from '@angular/core';
import { ModelDTO, Model } from '@app/core/data/types';
import { FavoriteService } from '@app/core/favorite.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, concat } from 'rxjs';
import {
  catchError,
  switchMap,
  exhaustMap,
  withLatestFrom,
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
  AddModelVersionSuccess,
  AddModelVersion,
} from '../actions/model-versions.actions';

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
              this.modelVersionBuilder
            );

            const models: Model[] = _.uniqBy(
              modelVersions.map(mv => mv.model),
              function (model: ModelDTO) {
                return model.id;
              }
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
              GetModelsSuccess({ payload: models })
            );
          }),
          catchError(error => {
            console.error(error);
            this.snackbar.show({
              message: `Failed to load model versions`,
            });
            return of(GetModelVersionsFail({ error }));
          })
        )
      )
    )
  );

  addModelVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddModelVersion),
      withLatestFrom(this.store.pipe(select(selectAllModels))),
      exhaustMap(([{ modelVersion }, models]) => {
        const modelExist = models.some(
          model => model.name === modelVersion.model.name
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
    private modelVersionsService: ModelVersionService,
    private actions$: Actions,
    private snackbar: SnackbarService,
    private store: Store<HydroServingState>,
    private favoriteService: FavoriteService
  ) {}
}
