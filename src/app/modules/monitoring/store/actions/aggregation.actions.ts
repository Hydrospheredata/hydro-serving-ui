import { createAction, props } from '@node_modules/@ngrx/store';

import { ModelVersion } from '@app/core/data/types';
import { AggregationsList, Aggregation } from '../../models';

export const LoadAggregations = createAction(
  '[Monitoring] load aggregations',
  props<{
    modelVersion: ModelVersion;
    limit: number;
    offset: number;
    from?: string;
    to?: string;
  }>()
);

export const LoadAggregationsSuccess = createAction(
  '[Monitoring] load aggregations success',
  props<{
    aggregationList: AggregationsList;
    minDate: number;
    maxDate: number;
  }>()
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

export const SetFilterDateRange = createAction(
  '[Monitoring] change date time range',
  props<{ from: number; to: number }>()
);
export const ClearFilterDateRange = createAction(
  '[Monitoring] clear date time range'
);
