import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, adapter } from '../states/model-versions.state';
import * as fromRouter from '../selectors/router.selectors';

const selectModelVersionsState = createFeatureSelector<State>('modelVersions');
const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllModelVersions = createSelector(
  selectModelVersionsState,
  selectAll
);

export const selectModelVersionEntities = createSelector(
  selectModelVersionsState,
  selectEntities
);

export const selectSelectedModelVersion = createSelector(
  selectModelVersionEntities,
  fromRouter.selectRouterParams,
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
  createSelector(selectAllModelVersions, modelVersions =>
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
  createSelector(selectAllModelVersionsByModelId(modelId), modelVersions => {
    return modelVersions.filter(
      modelVersion => modelVersion.id !== modelVersionId
    );
  });
