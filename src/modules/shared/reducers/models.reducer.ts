import { Model } from '@shared/_index';
import * as ModelActions from '@shared/actions/_index';


const initialState: Model[] = [];


export function ModelsReducer (state = initialState, action: ModelActions.ModelActions) {
    switch (action.type) {
        case ModelActions.GET_MODELS:
            return Object.assign([], state, action.payload);
        case ModelActions.ADD_MODEL:
            return [
                ...state.slice(0),
                action.payload
            ];
        case ModelActions.UPDATE_MODEL:
            // const stateNew = state.filter(service => service.id !== +action.serviceId);
            return state;
        case ModelActions.DELETE_MODEL:
            return state.filter(service => service.id !== +action.modelId);
        default:
            return state;
    }
}
