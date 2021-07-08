import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, adapter } from '../states/model-versions.state';
import * as fromRouter from '../selectors/router.selectors';
import { ModelVersionStatus } from '@app/core/data/types';

const selectModelVersionsState = createFeatureSelector<State>('modelVersions');
const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllModelVersions = createSelector(
  selectModelVersionsState,
  selectAll,
);

export const selectInternalModelVersions = createSelector(
  selectAllModelVersions,
  modelVersions => modelVersions.filter(mv => mv.isExternal !== true),
);

export const selectModelVersionEntities = createSelector(
  selectModelVersionsState,
  selectEntities,
);

export const selectSelectedModelVersion = createSelector(
  selectAllModelVersions,
  fromRouter.selectRouterParams,
  (versions, router) => {
    const modelName = router.params.modelName;
    const version = Number(router.params.modelVersionNumber);
    let mv = null;

    if (modelName && version) {
      mv = versions.find(
        mv => mv.model.name === modelName && mv.modelVersion === version,
      );
      return mv;
    }
  },
);

export const selectModelVersionsLoading = createSelector(
  selectModelVersionsState,
  state => state.loading,
);
export const selectModelVersionsLoaded = createSelector(
  selectModelVersionsState,
  state => state.loaded,
);
export const selectAllModelVersionsByModelId = (id: number) =>
  createSelector(selectAllModelVersions, modelVersions => {
    return modelVersions.filter(modelVersion => modelVersion.model.id === id);
  });
export const selectModelVersionById = id =>
  createSelector(
    selectModelVersionEntities,
    entities => entities && entities[id],
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
      modelVersion => modelVersion.id !== modelVersionId,
    );
  });

export const selectFirstModelVersion = createSelector(
  selectAllModelVersions,
  modelVersions =>
    modelVersions
      ? modelVersions => modelVersions.filter(mv => mv.isExternal !== true)
      : modelVersions[0],
);

export const selectInternalReleasedNonMetricModelVersions = createSelector(
  selectAllModelVersions,
  mvs => {
    return mvs.filter(
      mv =>
        !mv.isExternal &&
        mv.status === ModelVersionStatus.Released &&
        !mv.metadata.is_metric,
    );
  },
);
