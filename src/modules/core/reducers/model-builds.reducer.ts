import { ModelBuild } from '@shared/models/_index';
import { ModelBuildsActions, ModelBuildsActionTypes } from '@models/actions';



const initialState: ModelBuild[] = [];

export function ModelBuildsReducer(state = initialState, action: ModelBuildsActions) {
    switch (action.type) {
        case ModelBuildsActionTypes.GetBuildsSuccess:
            return action.payload;
        default:
            return state;
    }
}
