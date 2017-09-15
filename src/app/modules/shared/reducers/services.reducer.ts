import { Service } from '@shared/_index';
import * as ServicesActions from '@shared/actions/_index';


const initialState: Service[] = [];


export const ServicesReducer = (state = initialState, action: ServicesActions.ServicesActions) => {
    switch (action.type) {
        case ServicesActions.GET_SERVICES:
            return Object.assign([], state, action.payload);
        case ServicesActions.ADD_SERVICE:
            return [
                ...state.slice(0),
                action.payload
            ];
        case ServicesActions.UPDATE_SERVICE:
            // const stateNew = state.filter(service => service.id !== +action.serviceId);
            return state;
        case ServicesActions.DELETE_SERVICE:
            return state.filter(service => service.id !== +action.serviceId);
        default:
            return state;
    }
}