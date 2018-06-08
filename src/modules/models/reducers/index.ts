import * as fromModel from './models.reducer';
import * as fromModelVersion from './model-versions.reducer';
import * as fromModelBuild from './model-builds.reducer';
import * as fromRoot from '@core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

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

export const getModelVersionEntitiesState = createSelector(
    getModelState,
    state => state.modelVersion
)

export const getModelBuildEntitiesState = createSelector(
    getModelState,
    state => state.modelBuild
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

export const getSelectedBuild = createSelector(
    getAllModelBuilds,
    fromRoot.getRouterState,
    (builds, router) => router.state && builds.find(build => build.version === Number(router.state.params.modelVersionId))
)
