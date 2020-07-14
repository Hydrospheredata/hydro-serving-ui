import { Aggregation, AggregationsList } from '@monitoring/models';
import { MonitoringService } from '@monitoring/services';
import { LoadAggregations, LoadAggregationsSuccess } from '@monitoring/store';

import { Injectable } from '@node_modules/@angular/core';
import { createEffect, Actions, ofType } from '@node_modules/@ngrx/effects';
import { switchMap, map } from '@node_modules/rxjs/internal/operators';

@Injectable()
export class AggregationEffects {
  loadAggregations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAggregations),
      switchMap(props => {
        return this.monitoringApi
          .getChecksAggregation({
            limit: props.limit,
            modelVersionId: props.modelVersion.id,
            offset: props.offset,
            from: props.from,
            to: props.to,
          })
          .pipe(
            map(result => {
              const aggregations = result.results
                .map(
                  aggregation =>
                    new Aggregation(aggregation, props.modelVersion)
                )
                .reverse();

              const { count, maxDate, minDate } = result;

              return LoadAggregationsSuccess({
                aggregationList: new AggregationsList(
                  aggregations,
                  count,
                  minDate,
                  maxDate
                ),
                minDate,
                maxDate,
              });
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private monitoringApi: MonitoringService
  ) {}
}
