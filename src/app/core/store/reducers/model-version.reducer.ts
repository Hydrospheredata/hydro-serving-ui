import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
  Dictionary,
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as _ from 'lodash';
import {
  ModelVersion,
  Application,
  Stage,
  IModelVariant,
} from '../../data/types';

import {
  AddSuccess as AddApplicationSuccess,
  UpdateSuccess as UpdateApplicationSuccess,
  DeleteSuccess as DeleteApplicationSuccess,
} from '../actions/applications.actions';
import {
  GetModelVersions,
  GetModelVersionsSuccess,
  AddModelVersionSuccess,
  GetModelVersionsFail,
  DeleteModelVersionSuccess,
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
  ),
  on(AddApplicationSuccess, UpdateApplicationSuccess, (state, { payload }) => {
    const application = payload;
    let updates: Update<ModelVersion>[] = [];
    //
    const toUpdate = (app: Application) => (
      modelVersion: ModelVersion
    ): Update<ModelVersion> => {
      const applicationNames: string[] = modelVersion.applications;
      if (!applicationNames.includes(app.name)) {
        return {
          id: modelVersion.id,
          changes: { applications: [...applicationNames, app.name] },
        };
      }
    };

    try {
      const a = getApplicationsModelVariants(application);
      const b = a.map(getModelVersion);
      const c = b.map(getId);
      const d = c.map(toModelVersion(state.entities));
      const e = d.map(toUpdate(application)).filter(_ => !!_);

      return adapter.updateMany(e, state);
    } catch (e) {
      console.error(e);
      return state;
    }
  }),
  on(DeleteApplicationSuccess, (state, { applicationName }) => {
    const modelVersions: ModelVersion[] = Object.values(state.entities);
    const hasApplication = (applicationName: string) => (
      modelVersion: ModelVersion
    ): boolean => modelVersion.applications.includes(applicationName);

    const toUpdate = (applicationName: string) => (
      modelVersion: ModelVersion
    ): Update<ModelVersion> => {
      return {
        id: modelVersion.id,
        changes: {
          applications: modelVersion.applications.filter(
            _ => _ !== applicationName
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
  })
);

export function reducer(state: State, action: Action): State {
  return modelVersionReducer(state, action);
}

export const {
  selectAll: selectAllModelVersions,
  selectEntities: selectModelVersionsEntities,
  selectIds: selectModelVersionsIds,
} = adapter.getSelectors();

// TODO: move utils
function getApplicationsModelVariants(
  application: Application
): IModelVariant[] {
  const stages = application.executionGraph.stages;
  const getModelVariants = (stage: Stage) => stage.modelVariants;
  return _.flatMap(stages, getModelVariants);
}

function getModelVersion(el: { modelVersion: ModelVersion }): ModelVersion {
  return el.modelVersion;
}
function getId(el: { id: number }): number {
  return el.id;
}
function toModelVersion(dict: Dictionary<ModelVersion>) {
  return (id: number): ModelVersion => dict[id];
}
