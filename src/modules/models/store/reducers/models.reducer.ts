import {
  GetModels,
  GetModelsSuccess,
  GetModelsFail,
  DeleteModelSuccess,
  ToggleFavorite,
} from '@models/store/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Model } from '@shared/models';

export interface State extends EntityState<Model> {
  loading: boolean;
  loaded: boolean;
}

const adapter: EntityAdapter<Model> = createEntityAdapter<Model>();

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

const modelsReducer = createReducer(
  initialState,
  on(GetModels, state => ({ ...state, loading: true })),
  on(GetModelsSuccess, (state, { payload }) =>
    adapter.addMany(payload, { ...state, loading: false, loaded: true })
  ),
  on(GetModelsFail, state => ({ ...state, loading: false })),
  on(DeleteModelSuccess, (state, { modelId }) =>
    adapter.removeOne(modelId, state)
  ),
  on(ToggleFavorite, (state, { model: { id, favorite } }) =>
    adapter.updateOne({ id, changes: { favorite: !favorite } }, state)
  )
);

export function reducer(state = initialState, action: Action): State {
  return modelsReducer(state, action);
}

export const {
  selectAll: selecAllModels,
  selectEntities: selectModelsEntities,
  selectIds: selectModelsIds,
} = adapter.getSelectors();
