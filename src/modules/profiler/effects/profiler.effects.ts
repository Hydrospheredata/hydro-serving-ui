import { Injectable } from '@angular/core';
import { ProfilerService } from '@core/services';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
    ProfilerServiceStatusActionTypes,
    ProfilerServiceStatusIsAvailable,
    ProfilerServiceStatusIsUnknown,
    ProfilerServiceStatusIsClosedForOSS,
    ProfilerServiceStatusIsFailed
} from '@profiler/actions';
import { of } from 'rxjs';
import { catchError, tap, switchMap, mapTo } from 'rxjs/operators';

@Injectable()
export class ProfilerEffects {
    @Effect()
    getProfilerServiceStatus$ = this.actions$.pipe(
        ofType(ProfilerServiceStatusActionTypes.GetProfilerServiceStatus),
        tap(_ => console.log()),
        switchMap( _ => this.profilerService.getProfilerServiceStatus().pipe(
            mapTo(() => new ProfilerServiceStatusIsAvailable()),
            catchError(err => {
                const is501Error = /501/i.test(err);
                if (is501Error) {
                    return of(new ProfilerServiceStatusIsClosedForOSS());
                } else {
                    return of(new ProfilerServiceStatusIsFailed(err || 'Something went wrong'));
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
