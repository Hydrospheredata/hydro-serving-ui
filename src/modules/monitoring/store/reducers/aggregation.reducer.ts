import { AggregationsList, Aggregation } from '@monitoring/models';
import {
  LoadAggregationsSuccess,
  LoadAggregationsFailed,
  SelectAggregation,
  LoadOlderAggregation,
  LoadNewerAggregation,
} from '@monitoring/store/actions/aggregation.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  aggregationList: AggregationsList;
  selectedAggregation: Aggregation;
  error: string;
  offset: number;
}

const initialState: State = {
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
    };
  }),
  on(LoadAggregationsFailed, (state, props) => {
    return { ...state, aggregationList: undefined, error: props.error };
  }),
  on(SelectAggregation, (state, props) => {
    return { ...state, selectedAggregation: props.aggregation };
  }),
  on(LoadOlderAggregation, state => ({ ...state, offset: state.offset + 1 })),
  on(LoadNewerAggregation, state => ({ ...state, offset: state.offset - 1 }))
);

export function reducer(state: State = initialState, action: Action): State {
  return aggregationReducer(state, action);
}
