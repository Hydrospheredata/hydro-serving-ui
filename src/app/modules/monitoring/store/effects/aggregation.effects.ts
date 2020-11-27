import { Aggregation, AggregationsList } from '../../models';
import { MonitoringService } from '../../services';
import { LoadAggregations, LoadAggregationsSuccess } from '../../store';

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/internal/operators';

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
