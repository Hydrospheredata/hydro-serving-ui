import { createReducer, Action } from '@ngrx/store';

export interface State {}

const initialState: State = {};
const monitoringPageStateReducer = createReducer(initialState);

export function reducer(
  state: State,
  action: Action
): State {
  return monitoringPageStateReducer(state, action);
}
