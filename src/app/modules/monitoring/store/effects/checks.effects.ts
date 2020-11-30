import { Check, CheckCollection } from '../../models';
import { MonitoringService } from '../../services';
import { LoadChecks, LoadChecksSuccess } from '../../store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/internal/operators';

@Injectable()
export class ChecksEffects {
  loadChecks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadChecks),
      switchMap(({ modelVersionId, from, to }) => {
        return this.monitoringApi.getChecks({
          modelVersionId,
          from,
          to,
        });
      }),
      map(res => {
        const checks = res.map(bareCheck => new Check(bareCheck));
        return LoadChecksSuccess({
          checks: new CheckCollection(checks),
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private monitoringApi: MonitoringService
  ) {}
}
