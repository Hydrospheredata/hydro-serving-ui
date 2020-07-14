import { AggregationsList, Aggregation } from '@monitoring/models';
import { createAction, props } from '@node_modules/@ngrx/store';
import { ModelVersion } from '@shared/models';

// TODO: immer
// export enum AggregationActionsTypes {
//   LoadAggregation = '[Monitoring] load aggregations',
//   LoadAggregationSuccess = '[Monitoring] load aggregations success',
//   LoadAggregationFailed = '[Monitoring] load aggregations failed',
//   SelectAggregation = '[Monitoring] select aggregation',
//   LoadOlderAggregation = '[Monitoring] load older aggregation',
//   LoadNewerAggregation = '[Monitoring] load newer aggregations',
//   ChangeDateTimeFrom = '[Monitoring] change datetime from',
//   ChangeDateTimeTo = '[Monitoring] change datetime to',
// }
//
// export class LoadAggregations implements Action {
//   readonly type = AggregationActionsTypes.LoadAggregation;
//   constructor(
//     public payload: {
//       modelVersion: ModelVersion;
//       limit: number;
//       offset: number;
//       dateTimeFrom?: string;
//       dateTimeTo?: string;
//     }
//   ) {}
// }
// export class LoadAggregationsSuccess implements Action {
//   readonly type = AggregationActionsTypes.LoadAggregationSuccess;
//   constructor(public payload: { aggregationList: AggregationsList }) {}
// }
//
// export class LoadAggregationsFailed implements Action {
//   readonly type = AggregationActionsTypes.LoadAggregationFailed;
//   constructor(public payload: { error: string }) {}
// }
//
// export class SelectAggregation implements Action {
//   readonly type = AggregationActionsTypes.SelectAggregation;
//   constructor(public payload: { aggregation: Aggregation }) {}
// }
//
// export class LoadOlderAggregation implements Action {
//   readonly type = AggregationActionsTypes.LoadOlderAggregation;
// }
//
// export class LoadNewerAggregation implements Action {
//   readonly type = AggregationActionsTypes.LoadNewerAggregation;
// }
//
// export class ChangeDateTimeFrom implements Action {
//   readonly type = AggregationActionsTypes.ChangeDateTimeFrom;
//   constructor(public payload: { datetime: Date }) {}
// }
//
// export class ChangeDateTimeTo implements Action {
//   readonly type = AggregationActionsTypes.ChangeDateTimeTo;
//   constructor(public payload: { datetime: Date }) {}
// }

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

// export type AggregationActions =
//   | LoadAggregations
//   | LoadAggregationsSuccess
//   | LoadAggregationsFailed
//   | SelectAggregation
//   | LoadOlderAggregation
//   | LoadNewerAggregation
//   | ChangeDateTimeFrom
//   | ChangeDateTimeTo;
