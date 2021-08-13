import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ModelVersion } from '../../data/types';

import { DeleteSuccess as DeleteApplicationSuccess } from '../actions/applications.actions';
import {
  GetModelVersions,
  GetModelVersionsSuccess,
  AddModelVersionSuccess,
  GetModelVersionsFail,
  DeleteModelVersionSuccess,
  UpdateModelVersions,
  UpsertModelVersion,
} from '../actions/model-versions.actions';

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
    adapter.addMany(payload, { ...state, loaded: true, loading: false }),
  ),
  on(GetModelVersionsFail, state => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(AddModelVersionSuccess, (state, { modelVersion }) =>
    adapter.upsertOne(modelVersion, state),
  ),
  on(DeleteModelVersionSuccess, (state, { modelVersionId }) =>
    adapter.removeOne(modelVersionId, state),
  ),
  on(UpsertModelVersion, (state, { modelVersion }) =>
    adapter.upsertOne(modelVersion, state),
  ),
  on(UpdateModelVersions, (state, { payload: modelVersions }) =>
    adapter.addMany(modelVersions, { ...state }),
  ),
  on(DeleteApplicationSuccess, (state, { applicationName }) => {
    const modelVersions: ModelVersion[] = Object.values(state.entities);
    const hasApplication =
      (applicationName: string) =>
      (modelVersion: ModelVersion): boolean =>
        modelVersion.applications.includes(applicationName);

    const toUpdate =
      (applicationName: string) =>
      (modelVersion: ModelVersion): Update<ModelVersion> => {
        return {
          id: modelVersion.id,
          changes: {
            applications: modelVersion.applications.filter(
              _ => _ !== applicationName,
            ),
          },
        };
      };

    try {
      const mvs = modelVersions.filter(hasApplication(applicationName));
      const updates = mvs.map(toUpdate(applicationName));

      return adapter.updateMany(updates, state);
    } catch (e) {
      return state;
    }
  }),
);

export function reducer(state: State, action: Action): State {
  return modelVersionReducer(state, action);
}

export const {
  selectAll: selectAllModelVersions,
  selectEntities: selectModelVersionsEntities,
  selectIds: selectModelVersionsIds,
} = adapter.getSelectors();
