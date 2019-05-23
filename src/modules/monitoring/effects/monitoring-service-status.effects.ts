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
import { switchMap, catchError, mapTo } from 'rxjs/operators';

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
                    mapTo(() => {
                        return of(new SetStatusToAvailableAction());
                    }),
                    catchError(err => {
                        const is501Error = /501/i.test(err);
                        if (is501Error) {
                            return of(new SetStatusToFailedAction('err'));
                        } else {
                            return of(new SetStatusToClosedForOSSAction());
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
