import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
} from 'rxjs/operators';
import * as servablesActions from '../actions';
import { ServablesService } from '../services';

@Injectable()
export class ServablesEffects {
  @Effect()
  getServables$ = this.actions$.pipe(
    ofType(servablesActions.getAll),
    exhaustMap(() =>
      this.servablesService.getAll().pipe(
        map(servables => servablesActions.getAllSuccess({ servables })),
        catchError(error => of(servablesActions.getAllFailed({ error })))
      )
    )
  );

  @Effect()
  deleteServable$ = this.actions$.pipe(
    ofType(servablesActions.deleteServable),
    exhaustMap(({ name }) =>
      this.servablesService.delete(name).pipe(
        map(() => servablesActions.deleteServableSuccess({name})),
        catchError(error =>
          of(servablesActions.deleteServableFailed({ error }))
        )
      )
    )
  );

  @Effect()
  getServable$ = this.actions$.pipe(
    ofType(servablesActions.getServable),
    exhaustMap(({ name }) =>
      this.servablesService.get(name).pipe(
        map(servable => servablesActions.getServableSuccess({ servable })),
        catchError(error => of(servablesActions.getServableFailed({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private servablesService: ServablesService
  ) {}
}
