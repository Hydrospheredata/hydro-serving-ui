import { createReducer, Action, on } from '@ngrx/store';
import { GetSuccess } from '@app/core/store/actions/service-statuses.actions';
import { adapter, initialState, State } from '../states/service-statuses.state';

const serviceStatusesReducer = createReducer(
  initialState,
  on(GetSuccess, (state, { payload }) => adapter.addOne(payload, state))
);

export function reducer(state: State, action: Action): State {
  return serviceStatusesReducer(state, action);
}
