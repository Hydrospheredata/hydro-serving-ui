import { ModelVersionActionTypes, ModelVersionsActions } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ModelVersion } from '@shared/models/_index';

interface ModelVersionsByModel {
  [modelId: number]: number[];
}
export interface ModelVersionState extends EntityState<ModelVersion> {
  loading: boolean;
  loaded: boolean;
  byModel: ModelVersionsByModel;
}

export const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<
  ModelVersion
>();

export const initialState: ModelVersionState = adapter.getInitialState({
  byModel: [],
  loading: false,
  loaded: false,
});

export function reducer(state = initialState, action: ModelVersionsActions) {
  let byModel: ModelVersionsByModel;
  switch (action.type) {
    case ModelVersionActionTypes.GetModelVersions:
      return { ...state, loading: true, loaded: false };
    case ModelVersionActionTypes.GetModelVersionsSuccess:
      byModel = modelVersionsByModel(action.payload);

      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        byModel,
      });
    case ModelVersionActionTypes.AddModelVersionSuccess:
      const { modelVersion } = action.payload;
      byModel = includeModelVersion(modelVersion, state.byModel);
      return adapter.upsertOne(modelVersion, {
        ...state,
        byModel,
      });
    case ModelVersionActionTypes.GetModelVersionsFail:
      return { ...state, loading: false, loaded: false };
    case ModelVersionActionTypes.DeleteModelVersion:
      const { modelVersionId } = action.payload;
      byModel = excludeModelVersion(modelVersionId, state.byModel);
      return adapter.removeOne(modelVersionId, {
        ...state,
        byModel,
      });
    default:
      return state;
  }
}

const modelVersionsByModel = (
  modelVersions: ModelVersion[]
): { [modelId: number]: number[] } => {
  const map = modelVersions.reduce((res, modelVersion) => {
    const modelId = modelVersion.model.id;
    if (res[modelId] === undefined) {
      res[modelId] = [];
    }

    res[modelId].push(modelVersion.id);

    return res;
  }, {});

  return map;
};

const excludeModelVersion = (
  modelVersionId: number,
  mapByModelId: ModelVersionsByModel
): ModelVersionsByModel => {
  const newMap = Object.assign({}, mapByModelId);

  for (const modelId in newMap) {
    if (newMap.hasOwnProperty(modelId)) {
      const modelVersionIds = newMap[modelId];
      const pos = modelVersionIds.indexOf(modelVersionId);
      if (pos >= 0) {
        newMap[modelId] = [
          ...modelVersionIds.slice(0, pos),
          ...modelVersionIds.slice(pos + 1, modelVersionIds.length),
        ];
      }
    }
  }
  return newMap;
};

const includeModelVersion = (
  modelVersion: ModelVersion,
  mapByModelId: ModelVersionsByModel
): ModelVersionsByModel => {
  const newMap = Object.assign({}, mapByModelId);
  const modelId = modelVersion.model.id;
  if (newMap[modelId] === undefined) {
    newMap[modelId] = [];
  }

  if (!newMap[modelId].includes(modelVersion.id)) {
    newMap[modelId].push(modelVersion.id);
  }

  return newMap;
};
