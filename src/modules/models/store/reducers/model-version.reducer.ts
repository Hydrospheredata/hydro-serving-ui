import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ModelVersion } from '@shared/models/_index';
import {
  GetModelVersions,
  GetModelVersionsSuccess,
  AddModelVersionSuccess,
  GetModelVersionsFail,
  DeleteModelVersionSuccess,
} from '../actions';

export interface State extends EntityState<ModelVersion> {
  loading: boolean;
  loaded: boolean;
}

const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<ModelVersion>({
  sortComparer: (a, b) => {
    return b.id - a.id;
  },
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

const modelVersionReducer = createReducer(
  initialState,
  on(GetModelVersions, state => ({ ...state, loading: true })),
  on(GetModelVersionsSuccess, (state, { payload }) =>
    adapter.addMany(payload, { ...state, loaded: true, loading: false })
  ),
  on(GetModelVersionsFail, state => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(AddModelVersionSuccess, (state, { modelVersion }) =>
    adapter.upsertOne(modelVersion, state)
  ),
  on(DeleteModelVersionSuccess, (state, { modelVersionId }) =>
    adapter.removeOne(modelVersionId, state)
  )
);

export function reducer(state: State, action: Action): State {
  return modelVersionReducer(state, action);
}

export const {
  selectAll: selectAllModelVersions,
  selectEntities: selectModelVersionsEntities,
  selectIds: selectModelVersionsIds,
} = adapter.getSelectors();
