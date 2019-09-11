import { GetChecksParams } from '@monitoring/interfaces';
import { props, createAction } from '@ngrx/store';

export const getChecks = createAction(
  '[Checks] get checks',
  props<GetChecksParams>()
);
export const getChecksSuccess = createAction(
  '[Checks] get checks with success',
  props<GetChecksParams>()
);
export const getChecksFailed = createAction(
  '[Checks] get checks with failed',
  props<GetChecksParams>()
);
export const getChecksAggregation = createAction(
  '[Checks] get checks aggregation',
  props<GetChecksParams>()
);
export const getChecksAggreagationSuccess = createAction(
  '[Checks] get checks aggregations with success',
  props<GetChecksParams>()
);
export const getChecksAggreagationFailed = createAction(
  '[Checks] get checks aggreagations  failed',
  props<GetChecksParams>()
);
