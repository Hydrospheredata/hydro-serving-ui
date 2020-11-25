import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
  Dictionary,
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

// import { filter } from 'fp-ts/lib/Array';

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
    // const application = payload;
    // let updates: Update<ModelVersion>[] = [];
    //
    // const toUpdate = (application: Application) => (
    //   modelVersion: ModelVersion
    // ): Update<ModelVersion> => {
    //   const applicationNames: string[] = modelVersion.applications;
    //   if (!applicationNames.includes(application.name)) {
    //     return {
    //       id: modelVersion.id,
    //       changes: { applications: [...applicationNames, application.name] },
    //     };
    //   }
    // };
    //
    // updates = pipe(
    //   application,
    //   getApplicationsModelVariants,
    //   map(getModelVersion),
    //   map(getId),
    //   map(toModelVersion(state.entities)),
    //   map(toUpdate(application))
    // );
    //
    // return adapter.updateMany(updates, state);

    return state;
  }),
  on(DeleteApplicationSuccess, (state, { applicationName }) => {
    // const modelVersions: ModelVersion[] = Object.values(state.entities);
    // const hasApplication = (applicationName: string) => (
    //   modelVersion: ModelVersion
    // ): boolean => modelVersion.applications.includes(applicationName);
    //
    // const toUpdate = (applicationName: string) => (
    //   modelVersion: ModelVersion
    // ): Update<ModelVersion> => {
    //   return {
    //     id: modelVersion.id,
    //     changes: {
    //       applications: modelVersion.applications.filter(
    //         _ => _ === applicationName
    //       ),
    //     },
    //   };
    // };
    //
    // const updates: Update<ModelVersion>[] = pipe(
    //   modelVersions,
    //   filter(hasApplication(applicationName)),
    //   map(toUpdate(applicationName))
    // );
    //
    // return adapter.updateMany(updates, state);

    return state;
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
// function getApplicationsModelVariants(
//   application: Application
// ): IModelVariant[] {
//   const getStages = (application: Application) =>
//     application.executionGraph.stages;
//   const getModelVariants = (stage: Stage) => stage.modelVariants;
//   const getMVs = flow(getStages, map(getModelVariants), flatten);
//
//   return getMVs(application);
// }
//
// function getModelVersion(el: { modelVersion: ModelVersion }): ModelVersion {
//   return el.modelVersion;
// }
// function getId(el: { id: number }): number {
//   return el.id;
// }
//
// function toModelVersion(dict: Dictionary<ModelVersion>) {
//   return (id: number): ModelVersion => dict[id];
// }
