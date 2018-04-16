import { ModelVersion } from '@shared/models/_index';
import { ModelVersionActionTypes, ModelVersionsActions } from '@shared/actions/_index';



const initialState: ModelVersion[] = [];

export function ModelVersionsReducer(state = initialState, action: ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionActionTypes.GetModelVersionsSuccess:
            return action.payload;
        case ModelVersionActionTypes.AddModelVersionSuccess:
            return [
                ...state.slice(0),
                action.payload
            ];
        default:
            return state;
    }
}
