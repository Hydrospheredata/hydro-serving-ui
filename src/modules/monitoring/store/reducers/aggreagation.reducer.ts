import { Aggregation } from '@monitoring/interfaces';
import {
  LoadFullAggregationSuccess,
  LoadDetailedAggregationSuccess,
} from '@monitoring/store/actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  full: Aggregation;
  detailed: Aggregation;
}

const initialState: State = {
  full: undefined,
  detailed: undefined,
};

const aggregationReducer = createReducer(
  initialState,
  on(LoadFullAggregationSuccess, (state, { fullAggregation }) => ({
    ...state,
    full: fullAggregation,
  })),
  on(LoadDetailedAggregationSuccess, (state, { detailedAggregation }) => ({
    ...state,
    detailed: detailedAggregation,
  }))
);

export function reducer(state: State, action: Action): State {
  return aggregationReducer(state, action);
}
