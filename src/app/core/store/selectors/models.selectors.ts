import { selectRouterParams } from '../selectors/router.selectors';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as R from 'ramda';

import { ModelVersion, ModelVersionStatus } from '../../data/types';
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
    const modelName = R.compose(R.prop('name'), R.prop('model'));
    const dictByModelName: Map<number, ModelVersion[]> =
      R.groupBy(modelName)(modelVersions);

    if (modelVersions.length === 0) {
      return models;
    }

    return models.filter(
      ({ name }) =>
        !dictByModelName[name].some(
          mv => (mv as ModelVersion).metadata.is_metric,
        ),
    );
  },
);

export const selectModelsWithReleasedVersions = createSelector(
  selectNonMetricModels,
  selectAllModelVersions,
  (models, modelVersions) => {
    const modelVersionsReleased = modelVersions.filter(
      mv => mv.status === ModelVersionStatus.Released && !mv.metadata.is_metric,
    );
    const idModels = modelVersionsReleased.map(mv => mv.model.id);
    return models.filter(({ id }) => idModels.includes(id));
  },
);

export const selectModelsLoading = createSelector(
  modelsState,
  state => state.loading,
);

export const selectModelsLoaded = createSelector(
  modelsState,
  state => state.loaded,
);

export const selectSelectedModel = createSelector(
  selectModelsEntities,
  selectRouterParams,
  (entities, router) => {
    return router.params && entities[router.params.modelName];
  },
);

export const selectFirstModel = createSelector(selectNonMetricModels, models =>
  models.length > 0 ? models[0] : null,
);
