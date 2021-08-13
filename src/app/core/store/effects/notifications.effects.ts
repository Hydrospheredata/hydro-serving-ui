import { Injectable } from '@angular/core';

import { SnackbarService } from '../../snackbar.service';
import { Notify } from '../actions/notifications.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotificationEffects {
  notify$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Notify),
        tap(({ kind, message }) => {
          this.snackbar.notify(kind, message);
        }),
      ),
    {
      dispatch: false,
    },
  );

  constructor(private actions$: Actions, private snackbar: SnackbarService) {}
}
