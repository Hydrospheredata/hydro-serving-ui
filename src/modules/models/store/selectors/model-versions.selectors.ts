import * as fromRoot from '@core/store/selectors';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromModelVersions from '../reducers/model-version.reducer';

export const selectModelVersionsState = createSelector(
  fromFeature.getFeatureState,
  state => state.modelVersions
);

export const selectAllModelVersions = createSelector(
  selectModelVersionsState,
  fromModelVersions.selectAllModelVersions
);

export const selectModelVersionEntities = createSelector(
  selectModelVersionsState,
  fromModelVersions.selectModelVersionsEntities
);

export const selectSelectedModelVersion = createSelector(
  selectModelVersionEntities,
  fromRoot.selectRouterParams,
  (entities, router) => {
    return entities && router.params && entities[router.params.modelVersionId];
  }
);

export const selectModelVersionsLoading = createSelector(
  selectModelVersionsState,
  state => state.loading
);
export const selectModelVersionsLoaded = createSelector(
  selectModelVersionsState,
  state => state.loaded
);
export const selectAllModelVersionsByModelId = (id: number) =>
  createSelector(
    selectAllModelVersions,
    modelVersions =>
      modelVersions.filter(modelVersion => modelVersion.model.id === id)
  );

export const selectModelVersionById = id =>
  createSelector(
    selectModelVersionEntities,
    entities => entities && entities[id]
  );

export const selectSiblingModelVersions = ({
  modelVersionId,
  modelId,
}: {
  modelVersionId: number;
  modelId: number;
}) =>
  createSelector(
    selectAllModelVersionsByModelId(modelId),
    modelVersions => {
      return modelVersions.filter(
        modelVersion => modelVersion.id !== modelVersionId
      );
    }
  );
