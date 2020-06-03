import { CheckCollection } from '@monitoring/models';
import { Action, createReducer, on } from '@ngrx/store';
import { ClearMonitoringPage, LoadChecks } from '../actions';
import { LoadChecksSuccess } from '../actions/checks.actions';

export interface State {
  checks: CheckCollection;
  loading: boolean;
}

const initialState: State = {
  checks: undefined,
  loading: false,
};

const checksReducer = createReducer(
  initialState,
  on(LoadChecks, state => {
    return { ...state, loading: true };
  }),
  on(LoadChecksSuccess, (state, props) => {
    return { ...state, checks: props.checks, loading: false };
  }),
  on(ClearMonitoringPage, () => initialState)
);

export function reducer(state: State = initialState, action: Action) {
  return checksReducer(state, action);
}
