import { ModelVersionActionTypes, ModelVersionsActions } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { combineReducers } from '@ngrx/store';
import { ModelVersion, IModelVersion } from '@shared/models/_index';

interface ModelVersionState extends EntityState<ModelVersion> {
    loading: boolean;
    loaded: boolean;
}

interface ByModelState {
    [index: number]: number[];
}

export interface State {
    allModelVersions: ModelVersionState;
    byModel: ByModelState;
}

export const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<ModelVersion>();

export const initialState: ModelVersionState = adapter.getInitialState({
    loading: false,
    loaded: false,
});

function byModelReducer(state = {}, action: ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionActionTypes.GetModelVersionsSuccess:

            return action.payload.reduce((newState, modelVersion: IModelVersion) => {
                if (newState[modelVersion.model.id] === undefined) {
                    newState[modelVersion.model.id] = [];
                }

                newState[modelVersion.model.id].push(modelVersion.id);

                return newState;
            }, {});
        default:
            return state;
    }
}

function allModelVersionsReducer(state = initialState, action: ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionActionTypes.GetModelVersions:
            return { ...state, loading: true, loaded: false };
        case ModelVersionActionTypes.GetModelVersionsSuccess:
            return adapter.addMany(action.payload, {
                ...state,
                loading: false,
                loaded: true,
            });
        case ModelVersionActionTypes.GetModelVersionsFail:
            return { ...state, loading: false, loaded: false };
        default:
            return state;
    }
}

export const modelVersionReducer = combineReducers({
    allModelVersions: allModelVersionsReducer,
    byModel: byModelReducer,
});
