import { ModelBuild } from '@shared/models/_index';
import * as ModelBuildsActions from '@shared/actions/_index';



const initialState: ModelBuild[] = [];

export function ModelBuildsReducer(state = initialState, action: ModelBuildsActions.ModelBuildsActions) {
    switch (action.type) {
        case ModelBuildsActions.GET_MODEL_BUILDS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
