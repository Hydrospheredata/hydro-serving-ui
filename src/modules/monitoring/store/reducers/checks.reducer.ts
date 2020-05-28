import { CheckCollection } from '@monitoring/models';
import { ClearMonitoringPage } from '../actions';
import { LoadChecksSuccess } from '../actions/checks.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  checks: CheckCollection;
}

const initialState: State = {
  checks: undefined,
};

const checksReducer = createReducer(
  initialState,
  on(LoadChecksSuccess, (state, props) => {
    return { ...state, checks: props.checks };
  }),
  on(ClearMonitoringPage, () => initialState)
);

export function reducer(state: State = initialState, action: Action) {
  return checksReducer(state, action);
}
