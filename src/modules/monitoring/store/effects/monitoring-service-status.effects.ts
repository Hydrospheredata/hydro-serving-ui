import { Injectable } from '@angular/core';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import {
  GetServiceStatusAction,
  SetStatusToAvailableAction,
  SetStatusToClosedForOSSAction,
  SetStatusToFailedAction,
} from '@monitoring/store/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable()
export class MonitoringServiceStatusEffects {
  @Effect()
  getMonitoringServiceStatus$ = this.actions$.pipe(
    ofType(GetServiceStatusAction),
    switchMap(_ => {
      return this.monitoringService.getMonitoringServiceStatus().pipe(
        map(() => SetStatusToAvailableAction()),
        catchError(err => {
          const is501Error = /501/i.test(err);
          if (is501Error) {
            return of(SetStatusToClosedForOSSAction());
          } else {
            const errMsg = err || 'Something went wrong';
            return of(SetStatusToFailedAction({ error: errMsg }));
          }
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private monitoringService: MonitoringService
  ) {}
}
