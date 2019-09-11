import { LoadSonarDataSuccess } from '@monitoring/store/actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {}

const initialState: State = {};

const sonarReducer = createReducer(
  initialState,
  on(LoadSonarDataSuccess, (state, { sonarData }) => ({
    ...state,
    ...sonarData,
  }))
);

export function reducer(state: State, action: Action): State {
  return sonarReducer(state, action);
}
