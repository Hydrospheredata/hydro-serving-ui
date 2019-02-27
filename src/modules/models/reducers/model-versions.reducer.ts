import { ModelVersionActionTypes, ModelVersionsActions } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ModelVersion, IModelVersion } from '@shared/models/_index';

export interface ModelVersionState extends EntityState<ModelVersion> {
    loading: boolean;
    loaded: boolean;
    byModel: any[];
}

export const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<ModelVersion>();

export const initialState: ModelVersionState = adapter.getInitialState({
    byModel: [],
    loading: false,
    loaded: false,
});

export function reducer(state = initialState, action: ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionActionTypes.GetModelVersions:
            return { ...state, loading: true, loaded: false };
        case ModelVersionActionTypes.GetModelVersionsSuccess:
            const byModel = action.payload.reduce((newState, modelVersion: IModelVersion) => {
                if (newState[modelVersion.model.id] === undefined) {
                    newState[modelVersion.model.id] = [];
                }

                newState[modelVersion.model.id].push(modelVersion.id);

                return newState;
            }, {});

            return adapter.addMany(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                byModel,
            });
        case ModelVersionActionTypes.GetModelVersionsFail:
            return { ...state, loading: false, loaded: false };
        default:
            return state;
    }
}
