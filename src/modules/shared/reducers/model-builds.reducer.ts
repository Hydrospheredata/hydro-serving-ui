import * as ModelBuildsActions from '@shared/actions/_index';



const initialState: any[] = [];

export function ModelBuildsReducer (state = initialState, action: ModelBuildsActions.ModelBuildsActions) {
    switch (action.type) {
    case ModelBuildsActions.GET_MODEL_BUILDS_SUCCESS:
        return action.payload;
    default:
        return state;
    }
}
