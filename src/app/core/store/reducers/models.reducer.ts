import { Action, createReducer, on } from '@ngrx/store';

import {
  GetModels,
  GetModelsSuccess,
  GetModelsFail,
  DeleteModelSuccess,
  ToggleFavorite,
  AddModel,
} from '../actions/models.actions';
import { initialState, adapter, State } from '../states/models.state';

const modelsReducer = createReducer(
  initialState,
  on(GetModels, state => ({ ...state, loading: true })),
  on(GetModelsSuccess, (state, { payload }) =>
    adapter.addMany(payload, { ...state, loading: false, loaded: true })
  ),
  on(AddModel, (state, payload) => adapter.addOne(payload.model, state)),
  on(GetModelsFail, state => ({ ...state, loading: false })),
  on(DeleteModelSuccess, (state, { modelId }) =>
    adapter.removeOne(modelId, state)
  ),
  on(ToggleFavorite, (state, { model: { name: id, favorite } }) =>
    adapter.updateOne({ id, changes: { favorite: !favorite } }, state)
  )
);

export function reducer(state = initialState, action: Action): State {
  return modelsReducer(state, action);
}
