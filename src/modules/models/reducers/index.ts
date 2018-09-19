import * as fromModel from './models.reducer';
import * as fromModelVersion from './model-versions.reducer';
import * as fromModelBuild from './model-builds.reducer';
import * as fromRoot from '@core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Model } from '@shared/_index';

export interface ModelsState {
    models: fromModel.State;
    modelVersion: fromModelVersion.State;
    modelBuild: fromModelBuild.State;
}

export interface State extends fromRoot.HydroServingState {
    models: ModelsState
}

export const reducers: ActionReducerMap<ModelsState> = {
    models: fromModel.reducer,
    modelVersion: fromModelVersion.reducer,
    modelBuild: fromModelBuild.reducer
}

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

export const getModelVersionEntitiesState = createSelector(
    getModelState,
    state => state.modelVersion
)

export const getModelBuildEntitiesState = createSelector(
    getModelState,
    state => state.modelBuild
)

export const getModelBuildEntitiesLoading = createSelector(
    getModelBuildEntitiesState,
    state => state.loading
)

export const getModelBuildEntitiesLoaded = createSelector(
    getModelBuildEntitiesState,
    state => state.loaded
)

export const {
    selectAll: getAllModels,
    selectEntities: getModelEntities,
    selectTotal: getTotalModels
} = fromModel.adapter.getSelectors(getModelEntitiesState);

export const {
    selectAll: getAllModelBuilds,
    selectEntities: getModelBuildEntities,
    selectTotal: getTotalModelBuilds
} = fromModelBuild.adapter.getSelectors(getModelBuildEntitiesState);

export const {
    selectAll: getAllModelVersions,
    selectEntities: getModelVersionEntities,
    selectTotal: getTotalModelVersions
} = fromModelVersion.adapter.getSelectors(getModelVersionEntitiesState);

export const getSelectedModel = createSelector(
    getModelEntities,
    fromRoot.getRouterState,
    (entities, router) => router.state && entities[router.state.params.modelId]
)

export const getSelectedModelId = createSelector(
    getSelectedModel,
    (model: Model): number => model && model.id
)

export const getSelectedBuild = createSelector(
    getAllModelBuilds,
    fromRoot.getRouterState,
    (builds, router) => {console.log("__", router.state, builds); return router.state && builds.find(build => build.version === Number(router.state.params.modelVersionId))}
)

export const getAllModelBuildsReversed = createSelector(
    getAllModelBuilds,
    builds => builds.reverse()
)
