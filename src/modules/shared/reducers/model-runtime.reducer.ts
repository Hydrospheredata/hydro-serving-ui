import * as ModelRuntimeActions from '@shared/actions/_index';



const initialState: any[] = [];

export function ModelRuntimeReducer (state = initialState, action: ModelRuntimeActions.ModelRuntimeActions) {
    switch (action.type) {
    case ModelRuntimeActions.GET_MODEL_BUILDS_SUCCESS:
        return action.payload;
    default:
        return state;
    }
}
