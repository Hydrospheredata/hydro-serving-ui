import { createAction, props } from '@ngrx/store';
import { TimeInterval } from '@shared/_index';

export const LoadFullAggregation = createAction(
  '[Monitoring page] load full aggregation'
);
export const LoadFullAggregationSuccess = createAction(
  '[Monitoring page] load full aggregation success',
  props<{ fullAggregation: any }>()
);
export const LoadFullAggregationFailed = createAction(
  '[Monitoring page] load full aggregation failed',
  props<{ error: string }>()
);
export const LoadDetailedAggreagation = createAction(
  '[Monitoring page] load detailed aggregation',
  props<{ timeInterval: TimeInterval }>()
);
export const LoadDetailedAggregationSuccess = createAction(
  '[Monitoring page] load detailed aggregation success',
  props<{ detailedAggregation: any }>()
);
export const LoadDetailedAggregationFailed = createAction(
  '[Monitoring page] load detailed aggregation failed',
  props<{ error: string }>()
);
