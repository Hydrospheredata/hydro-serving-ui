import { createReducer, Action, on } from '@ngrx/store';

import {
  getAll,
  getAllSuccess,
  deleteServable,
  updateServable,
} from '../actions/servables.actions';
import { initialState, adapter, State } from '../states/servables.state';

const servableReducer = createReducer(
  initialState,
  on(getAll, state => ({ ...state, loading: true })),
  on(getAllSuccess, (state, props) =>
    adapter.addMany(props.servables, { ...state, loading: false })
  ),
  on(deleteServable, (state, { name }) => adapter.removeOne(name, state)),
  on(updateServable, (state, { servable }) =>
    adapter.upsertOne(servable, state)
  )
);

export function reducer(state: State, action: Action): State {
  return servableReducer(state, action);
}
