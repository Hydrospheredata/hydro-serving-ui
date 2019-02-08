import * as fromRoot from '@core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Model } from '@shared/_index';
import * as fromModelVersion from './model-versions.reducer';
import * as fromModel from './models.reducer';

export interface ModelsState {
    models: fromModel.State;
    modelVersion: fromModelVersion.State;
}

export interface State extends fromRoot.HydroServingState {
    models: ModelsState;
}

export const reducers: ActionReducerMap<ModelsState> = {
    models: fromModel.reducer,
    modelVersion: fromModelVersion.modelVersionReducer,
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

export const getModelVersionEntitiesState = createSelector(
    getModelVersionState,
    state => state.allModelVersions
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
} = fromModelVersion.adapter.getSelectors(getModelVersionEntitiesState);

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
    (entities, router) => router.state && entities[router.state.params.modelVersionId]);

export const getModelVersionLoading = createSelector(
    getModelVersionEntitiesState,
    state => state.loading
);

export const getModelVersionLoaded = createSelector(
    getModelVersionEntitiesState,
    state => state.loaded
);

export const getModelVersionsByModelId = (modelId: number) => createSelector(
    getModelVersionState,
    getModelVersionEntities,
    (state, entities) => {
        return state.byModel[modelId] && state.byModel[modelId].map(id => entities[id]);
    }
);
