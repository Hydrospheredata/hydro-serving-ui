import { createReducer, on, Action } from '@ngrx/store';

import { AggregationsList, Aggregation } from '../../models';
import {
  ClearMonitoringPage,
  LoadAggregationsSuccess,
  LoadAggregationsFailed,
  SelectAggregation,
  LoadOlderAggregation,
  SetFilterDateRange,
  ClearFilterDateRange,
  LoadNewerAggregation,
} from '../actions';

export interface State {
  minDate: number;
  maxDate: number;
  filterDateRange: { from: number; to: number };
  aggregationList: AggregationsList;
  selectedAggregation: Aggregation;
  error: string;
  offset: number;
}

const initialState: State = {
  minDate: undefined,
  maxDate: undefined,
  filterDateRange: undefined,
  aggregationList: undefined,
  selectedAggregation: undefined,
  error: undefined,
  offset: 0,
};

const aggregationReducer = createReducer(
  initialState,
  on(LoadAggregationsSuccess, (state, props) => {
    return {
      ...state,
      aggregationList: props.aggregationList,
      error: undefined,
      minDate: props.minDate,
      maxDate: props.maxDate,
    };
  }),
  on(LoadAggregationsFailed, (state, props) => {
    return { ...state, aggregationList: undefined, error: props.error };
  }),
  on(SelectAggregation, (state, props) => {
    return { ...state, selectedAggregation: props.aggregation };
  }),
  on(LoadOlderAggregation, state => ({ ...state, offset: state.offset + 1 })),
  on(LoadNewerAggregation, state => ({ ...state, offset: state.offset - 1 })),
  on(SetFilterDateRange, (state, { from, to }) => {
    return { ...state, filterDateRange: { from, to } };
  }),
  on(ClearFilterDateRange, state => ({ ...state, filterDateRange: undefined })),
  on(ClearMonitoringPage, () => initialState)
);

export function reducer(state: State = initialState, action: Action): State {
  return aggregationReducer(state, action);
}

// TODO: immer
// export const reducer = produce((draft: State, action: AggregationActions) => {
//   switch (action.type) {
//     case AggregationActionsTypes.LoadAggregationSuccess:
//       draft.aggregationList = action.payload.aggregationList;
//       return;
//     case AggregationActionsTypes.LoadAggregationFailed:
//       draft.error = action.payload.error;
//       return;
//     case AggregationActionsTypes.LoadNewerAggregation:
//       draft.offset = draft.offset - 1;
//       return;
//     case AggregationActionsTypes.LoadOlderAggregation:
//       draft.offset = draft.offset + 1;
//       return;
//     case AggregationActionsTypes.ChangeDateTimeFrom:
//       draft.dateTimeFrom = action.payload.datetime;
//       return;
//     case AggregationActionsTypes.ChangeDateTimeTo:
//       draft.dateTimeTo = action.payload.datetime;
//       return;
//   }
// }, initialState);
