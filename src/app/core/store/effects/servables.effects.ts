import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';

import {
  getAll,
  getAllSuccess,
  getAllFailed,
  deleteServable,
  deleteServableSuccess,
  deleteServableFailed,
  getServable,
  getServableSuccess,
  getServableFailed,
} from '../actions/servables.actions';
import { ServableService } from '../../data/services/servable.service';
import { SnackbarService } from '@app/core/snackbar.service';

@Injectable()
export class ServablesEffects {
  @Effect()
  getServables$ = this.actions$.pipe(
    ofType(getAll),
    exhaustMap(() =>
      this.servablesService.getAll().pipe(
        map(servables => getAllSuccess({ servables })),
        catchError(error => of(getAllFailed({ error })))
      )
    )
  );

  @Effect()
  deleteServable$ = this.actions$.pipe(
    ofType(deleteServable),
    exhaustMap(({ name }) =>
      this.servablesService.delete(name).pipe(
        map(() => deleteServableSuccess({ name })),
        catchError(error => {
          this.snackbarService.show({
            message: error.replaceAll(",", ", ")
          });
          return of(deleteServableFailed( {error} ));
        })
      )
    )
  );

  @Effect()
  getServable$ = this.actions$.pipe(
    ofType(getServable),
    exhaustMap(({ name }) =>
      this.servablesService.get(name).pipe(
        map(servable => getServableSuccess({ servable })),
        catchError(error => of(getServableFailed({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private servablesService: ServableService,
    private snackbarService: SnackbarService
  ) {}
}
