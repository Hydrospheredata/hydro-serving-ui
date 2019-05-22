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
import { ProfilerStatus } from '@profiler/models';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class ProfilerEffects {
    @Effect()
    getProfilerServiceStatus$ = this.actions$.pipe(
        ofType(ProfilerServiceStatusActionTypes.GetProfilerServiceStatus),
        tap(_ => console.log()),
        switchMap( _ => this.profilerService.getProfilerServiceStatus().pipe(
            map( status => {
                switch (status) {
                    case ProfilerStatus.AVAILABLE:
                        return new ProfilerServiceStatusIsAvailable();
                    case ProfilerStatus.CLOSED_FOR_OSS:
                        return new ProfilerServiceStatusIsClosedForOSS();
                    default:
                        return new ProfilerServiceStatusIsUnknown();
                }
            }),
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
