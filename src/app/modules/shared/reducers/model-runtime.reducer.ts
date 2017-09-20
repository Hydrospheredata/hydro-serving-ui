import { ModelService } from '@shared/models/_index';
import * as ModelRuntimeActions from '@shared/actions/_index';


const initialState: ModelService[] = [];


export function ModelRuntimeReducer (state = initialState, action: ModelRuntimeActions.ModelRuntimeActions) {
    switch (action.type) {
        case ModelRuntimeActions.GET_MODEL_RUNTIME:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
