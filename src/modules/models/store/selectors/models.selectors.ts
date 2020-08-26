import * as fromRoot from '@core/store/selectors';
import { selectAllModelVersions } from '@models/store/selectors/model-versions.selectors';
import { createSelector } from '@ngrx/store';
import { ModelVersion } from '@shared/models';
import * as fromFeature from '../reducers';
import * as fromModels from '../reducers/models.reducer';
import * as R from 'ramda';

export const modelsState = createSelector(
  fromFeature.getFeatureState,
  state => state.models
);

export const selectAllModels = createSelector(
  modelsState,
  fromModels.selecAllModels
);

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
