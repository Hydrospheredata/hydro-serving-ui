import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, concat } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  exhaustMap,
  withLatestFrom,
} from 'rxjs/operators';

import { SnackbarService } from '../../snackbar.service';

import { ModelBuilder, ModelVersionBuilder } from '../../data/builders';
import { ModelVersionService } from '../../data/services/model-version.service';

import { HydroServingState } from '../states/root.state';
import { selectAllModels } from '../selectors/models.selectors';
import { AddModel } from '../actions/models.actions';
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
          map(data => {
            const modelVersions = data.map(
              this.modelVersionBuilder.build,
              this.modelVersionBuilder
            );
            return GetModelVersionsSuccess({ payload: modelVersions });
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
    private store: Store<HydroServingState>
  ) {}
}
