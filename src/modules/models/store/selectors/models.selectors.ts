import * as fromRoot from '@core/store/selectors';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromModels from '../reducers/models.reducer';

export const modelsState = createSelector(
  fromFeature.getFeatureState,
  state => state.models
);

export const selectAllModels = createSelector(
  modelsState,
  fromModels.selecAllModels
);

export const selectModelsEntities = createSelector(
  modelsState,
  fromModels.selectModelsEntities
);
export const selectModelsLoading = createSelector(
  modelsState,
  state => state.loading
);
export const selectModelsLoaded = createSelector(
  modelsState,
  state => state.loaded
);
export const selectSelectedModel = createSelector(
  selectModelsEntities,
  fromRoot.selectRouterParams,
  (entities, router) => router.params && entities[router.params.modelId]
);
