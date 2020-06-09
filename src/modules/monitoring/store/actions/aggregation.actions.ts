import { AggregationsList, Aggregation } from '@monitoring/models';
import { createAction, props } from '@node_modules/@ngrx/store';
import { ModelVersion } from '@shared/models';

export const LoadAggregations = createAction(
  '[Monitoring] load aggregations',
  props<{ modelVersion: ModelVersion; limit: number; offset: number }>()
);

export const LoadAggregationsSuccess = createAction(
  '[Monitoring] load aggregations success',
  props<{ aggregationList: AggregationsList }>()
);

export const LoadAggregationsFailed = createAction(
  '[Monitoring] load aggregations failed',
  props<{ error: string }>()
);

export const SelectAggregation = createAction(
  '[Monitoring] select aggregation',
  props<{ aggregation: Aggregation }>()
);

export const LoadOlderAggregation = createAction(
  '[Monitoring] load older aggregation'
);

export const LoadNewerAggregation = createAction(
  '[Monitoring] load newer aggregation'
);
