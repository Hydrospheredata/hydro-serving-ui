import { Injectable } from '@angular/core';
import { Get, GetFail, GetSuccess } from '@app/core/store/actions/service-statuses.actions';
import { ServiceStatusService } from '@app/core/data/services/service-status.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ServiceStatusesEffects {
  getServiceStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Get),
      switchMap(
        action => {
          return this.serviceStatusService.loadSupported(action.payload).pipe(
            map(res => {
                const payload = {
                  id: action.payload,
                  statuses: res
                }
                return GetSuccess({ payload })
              },
              catchError(error => {
                return of(GetFail({ error }))
              })
            )
          )
        }
      )
    )
  )

  constructor(
    private actions$: Actions,
    private serviceStatusService: ServiceStatusService,
  ) {}
}
