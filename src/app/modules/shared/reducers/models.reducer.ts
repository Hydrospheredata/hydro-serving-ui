import { Model } from '@shared/_index';
import * as ModelActions from '@shared/actions/_index';


const initialState: Service[] = [];


export function ServicesReducer (state = initialState, action: ModelActions.ModelActions) {
    switch (action.type) {
        case ModelActions.GET_MODELS:
            return Object.assign([], state, action.payload);
        case ModelActions.ADD_MODELS:
            return [
                ...state.slice(0),
                action.payload
            ];
        case ModelActions.UPDATE_MODELS:
            // const stateNew = state.filter(service => service.id !== +action.serviceId);
            return state;
        case ModelActions.DELETE_MODELS:
            return state.filter(service => service.id !== +action.serviceId);
        default:
            return state;
    }
}
