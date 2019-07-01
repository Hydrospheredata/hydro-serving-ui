import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import * as rootCauseActions from '../actions';
import { RootCauseService } from '../services/root-cause.service';

@Injectable()
export class RootCauseEffects {
  @Effect()
  getExplanation$ = this.actions$.pipe(
    ofType(rootCauseActions.GetExplanation),
    exhaustMap(action => {
      return this.rootCause.getExplanation().pipe(
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
