import { Injectable } from '@angular/core';
import { ProfilerService } from '@core/services';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import {
  ProfilerServiceStatusIsAvailable,
  ProfilerServiceStatusIsClosedForOSS,
  ProfilerServiceStatusIsFailed,
  GetProfilerServiceStatus,
} from '../actions';

@Injectable()
export class ProfilerEffects {
  @Effect()
  getProfilerServiceStatus$ = this.actions$.pipe(
    ofType(GetProfilerServiceStatus),
    switchMap(_ =>
      this.profilerService.getProfilerServiceStatus().pipe(
        map(() => ProfilerServiceStatusIsAvailable()),
        catchError((err: string) => {
          const is501Error = /501/i.test(err);
          if (is501Error) {
            return of(ProfilerServiceStatusIsClosedForOSS());
          } else {
            const error = err || 'Something went wrong';
            return of(ProfilerServiceStatusIsFailed({ error }));
          }
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profilerService: ProfilerService
  ) {}
}
