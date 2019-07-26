import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, switchMap } from 'rxjs/operators';
import { RootCauseService } from '../services';
import * as rootCauseActions from './root-cause.actions';

@Injectable()
export class RootCauseEffects {
  @Effect()
  getExplanation$ = this.actions$.pipe(
    ofType(rootCauseActions.GetExplanation),
    switchMap(action => {
      return this.rootCause.getExplanation(action.requestBody).pipe(
        switchMap(redirectUrl => {
          return this.rootCause.getStatus(redirectUrl).pipe(
            switchMap(({ result, state }) =>
              this.rootCause.a(result).pipe(
                map(explanation => {
                  return rootCauseActions.GetExplanationSuccess({
                    explanation,
                  });
                })
              )
            )
          );
        }),
        catchError(error => {
          return of(rootCauseActions.GetExplanationFailed({ error }));
        })
      );
    })
  );

  constructor(private actions$: Actions, private rootCause: RootCauseService) {}
}
