import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { RootCauseService } from '../services/root-cause.service';
import * as rootCauseActions from './root-cause.actions';

@Injectable()
export class RootCauseEffects {
  @Effect()
  getExplanation$ = this.actions$.pipe(
    ofType(rootCauseActions.GetExplanation),
    exhaustMap(action => {
      return this.rootCause.getExplanation(action.requestBody).pipe(
        map(explanation =>
          rootCauseActions.GetExplanationSuccess({ explanation })
        ),
        catchError(error => {
          return of(rootCauseActions.GetExplanationFailed({ error }));
        })
      );
    })
  );

  constructor(private actions$: Actions, private rootCause: RootCauseService) {}
}
