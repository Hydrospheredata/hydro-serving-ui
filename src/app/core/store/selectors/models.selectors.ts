import { selectRouterParams } from '../selectors/router.selectors';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as R from 'ramda';

import { ModelVersion } from '../../data/types';
import { selectAllModelVersions } from './model-versions.selectors';
import { State, adapter } from '../states/models.state';

const modelsState = createFeatureSelector<State>('models');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectModelsEntities = createSelector(modelsState, selectEntities);
export const selectAllModels = createSelector(modelsState, selectAll);
// TODO: should normalize data
// Models which don't have metrics modelVersions
export const selectNonMetricModels = createSelector(
  selectAllModels,
  selectAllModelVersions,
  (models, modelVersions) => {
    const modelId = R.compose(R.prop('id'), R.prop('model'));
    const dictByModelId: Map<number, ModelVersion[]> = R.groupBy(modelId)(
      modelVersions
    );

    if (modelVersions.length === 0) {
      return models;
    }

    return models.filter(
      ({ id }) =>
        !dictByModelId[id].some(mv => (mv as ModelVersion).metadata.is_metric)
    );
  }
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
  selectRouterParams,
  (entities, router) => {
    return router.params && entities[router.params.modelId];
  }
);
