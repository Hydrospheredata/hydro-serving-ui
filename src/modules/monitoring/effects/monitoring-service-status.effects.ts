import { Injectable } from '@angular/core';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import {
    MonitoringServiceStatusActionTypes as actionTypes,
    SetStatusToAvailableAction,
    SetStatusToFailedAction,
    SetStatusToClosedForOSSAction
} from '@monitoring/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, mapTo, tap, map } from 'rxjs/operators';

@Injectable()
export class MonitoringServiceStatusEffects {

    @Effect()
    getMonitoringServiceStatus$ = this.actions$.pipe(
        ofType(actionTypes.GetServiceStatus),
        switchMap(_ => {
            return this
                .monitoringService
                .getMonitoringServiceStatus()
                .pipe(
                    map(() => {
                        return new SetStatusToAvailableAction();
                    }),
                    catchError(err => {
                        const is501Error = /501/i.test(err);
                        if (is501Error) {
                            return of(new SetStatusToClosedForOSSAction());
                        } else {
                            const errMsg = err || 'Something went wrong';
                            return of(new SetStatusToFailedAction(errMsg));
                        }
                    })
                );
        }
        )
    );

    constructor(
        private actions$: Actions,
        private monitoringService: MonitoringService
    ) {
    }
}
