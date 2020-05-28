import { Aggregation, AggregationsList } from '@monitoring/models';
import { MonitoringService } from '@monitoring/services';
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
export class AggregationEffects {
  loadAggregations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAggregations),
      switchMap(props => {
        return this.monitoringApi.getChecksAggregation({
          limit: props.limit,
          modelVersionId: props.modelVerId,
          offset: props.offset,
        });
      }),
      map(({ count, results }) => {
        const aggregations = results
          .map(aggregation => new Aggregation(aggregation))
          .reverse();
        return LoadAggregationsSuccess({
          aggregationList: new AggregationsList(aggregations, count),
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private monitoringApi: MonitoringService
  ) {}
}
