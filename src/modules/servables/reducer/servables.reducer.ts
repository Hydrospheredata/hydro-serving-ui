import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions';
import { Servable } from '../models';
import { State } from '../state';

export const adapter = createEntityAdapter<Servable>({
  selectId: servable => servable.fullName,
});

const initialState = (): State => {
  return { ...adapter.getInitialState(), loading: false, error: null };
};

const servableReducer = createReducer(
  initialState(),
  on(actions.getAll, state => ({ ...state, loading: true })),
  on(actions.getAllSuccess, (state, props) =>
    adapter.addMany(props.servables, { ...state, loading: false })
  ),
  on(actions.deleteServable, (state, { name }) =>
    adapter.removeOne(name, state)
  ),
  on(actions.updateServable, (state, { servable }) =>
    adapter.upsertOne(servable, state)
  )
);

export function reducer(state: State, action: Action): State {
  return servableReducer(state, action);
}
