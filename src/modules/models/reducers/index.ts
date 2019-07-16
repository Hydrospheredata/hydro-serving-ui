import * as fromRoot from '@core/reducers';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { Model } from '@shared/_index';
import * as fromModelVersion from './model-versions.reducer';
import * as fromModel from './models.reducer';

export interface ModelsState {
  models: fromModel.State;
  modelVersion: fromModelVersion.ModelVersionState;
}

export interface State extends fromRoot.HydroServingState {
  models: ModelsState;
}

export const reducers: ActionReducerMap<ModelsState> = {
  models: fromModel.reducer,
  modelVersion: fromModelVersion.reducer,
};

export const getModelState = createFeatureSelector<ModelsState>('models');

export const getModelEntitiesState = createSelector(
  getModelState,
  state => state.models
);

export const getModelEntitiesLoading = createSelector(
  getModelEntitiesState,
  state => state.loading
);

export const getModelEntitiesLoaded = createSelector(
  getModelEntitiesState,
  state => state.loaded
);

export const getModelVersionState = createSelector(
  getModelState,
  state => state.modelVersion
);

export const {
  selectAll: getAllModels,
  selectEntities: getModelEntities,
  selectTotal: getTotalModels,
} = fromModel.adapter.getSelectors(getModelEntitiesState);

export const {
  selectAll: getAllModelVersions,
  selectEntities: getModelVersionEntities,
  selectTotal: getTotalModelVersions,
} = fromModelVersion.adapter.getSelectors(getModelVersionState);

export const getSelectedModel = createSelector(
  getModelEntities,
  fromRoot.getRouterState,
  (entities, router) => router.state && entities[router.state.params.modelId]
);

export const getSelectedModelId = createSelector(
  getSelectedModel,
  (model: Model): number => model && model.id
);

export const getSelectedModelVersion = createSelector(
  getModelVersionEntities,
  fromRoot.getRouterState,
  (entities, router) =>
    router.state && entities[router.state.params.modelVersionId]
);

export const getSelectedModelVersionId = createSelector(
  fromRoot.getRouterState,
  router => router.state && router.state.params.modelVersionId
);

export const getModelVersionLoading = createSelector(
  getModelVersionState,
  state => state.loading
);

export const getModelVersionLoaded = createSelector(
  getModelVersionState,
  state => state.loaded
);

export const getSiblingVersions = createSelector(
  getModelVersionState,
  getSelectedModelVersion,
  (state, modelVersion) => {
    if (!modelVersion) {
      return;
    }
    const ids = state.byModel[modelVersion.model.id].filter(
      id => id !== modelVersion.id
    );
    return ids.map(id => state.entities[id]);
  }
);

export const getGroupedModelVersions = createSelector(
  getModelVersionState,
  state => state.byModel
);

export const getModelVersionsByModelId = (modelId: number) =>
  createSelector(
    getModelVersionState,
    getModelVersionEntities,
    (state, entities) => {
      return (
        state.byModel[modelId] &&
        state.byModel[modelId]
          .map(id => entities[id])
          .sort((a, b) => b.modelVersion - a.modelVersion)
      );
    }
  );

export const getModelsWithAtleastTwoModelVersions = createSelector(
  getModelEntities,
  getGroupedModelVersions,
  (models, groupedModelVersion) => {
    const ids = [];
    for (const modelId in groupedModelVersion) {
      if (groupedModelVersion.hasOwnProperty(modelId)) {
        if (groupedModelVersion[modelId].length >= 2) {
          ids.push(modelId);
        }
      }
    }
    return ids.map(id => models[id]);
  }
);

export const getVersionByModelVersionId = (modelVersionId: number) => createSelector(
  getModelVersionState,
  state => {
    return state && state.entities[modelVersionId].modelVersion;
  }
);
