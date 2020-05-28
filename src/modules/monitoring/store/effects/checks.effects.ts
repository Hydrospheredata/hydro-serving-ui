import {
  Aggregation,
  AggregationsList,
  Check,
  CheckCollection,
} from '@monitoring/models';
import { MonitoringService } from '@monitoring/services';
import { LoadChecks, LoadChecksSuccess } from '@monitoring/store';
import {
  LoadAggregations,
  LoadAggregationsSuccess,
} from '@monitoring/store/actions/aggregation.actions';
import { Injectable } from '@node_modules/@angular/core';
import { createEffect, Actions, ofType } from '@node_modules/@ngrx/effects';
import { of } from '@node_modules/rxjs';
import { switchMap, map } from '@node_modules/rxjs/internal/operators';
import { log } from '@shared/utils';

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
