import { Injectable } from '@angular/core';
import { ProfilerService } from '@core/services';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
    ProfilerServiceStatusActionTypes,
    ProfilerServiceStatusIsAvailable,
    ProfilerServiceStatusIsClosedForOSS,
    ProfilerServiceStatusIsFailed
} from '@profiler/actions';
import { of } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';

@Injectable()
export class ProfilerEffects {
    @Effect()
    getProfilerServiceStatus$ = this.actions$.pipe(
        ofType(ProfilerServiceStatusActionTypes.GetProfilerServiceStatus),
        switchMap( _ => this.profilerService.getProfilerServiceStatus().pipe(
            map(() => new ProfilerServiceStatusIsAvailable()),
            catchError((err: string) => {
                const is501Error = /501/i.test(err);
                if (is501Error) {
                    return of(new ProfilerServiceStatusIsClosedForOSS());
                } else {
                    const errorMessage =  err || 'Something went wrong';
                    return of(new ProfilerServiceStatusIsFailed({errorMessage}));
                }

            })
        ))
    );

    constructor(
        private actions$: Actions,
        private profilerService: ProfilerService
    ) {
    }
}
