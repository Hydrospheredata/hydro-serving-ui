import { createReducer, Action, on } from '@ngrx/store';
import * as rootCauseActions from '../actions';
import { Explanation } from '../models';

export interface State {
  explanation: Explanation;
  loading: boolean;
  error: string;
}

const initialState: State = {
  explanation: null,
  loading: false,
  error: null,
};

const rootCauseReducer = createReducer(
  initialState,
  on(rootCauseActions.GetExplanation, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(rootCauseActions.GetExplanationSuccess, (state, { explanation }) => ({
    ...state,
    loading: false,
    explanation,
  })),
  on(rootCauseActions.GetExplanationFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function reducer(state: State, action: Action): State {
  return rootCauseReducer(state, action);
}
