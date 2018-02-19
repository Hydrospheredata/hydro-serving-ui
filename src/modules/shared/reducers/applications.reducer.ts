import { Application } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



const initialState: Application[] = [];

export function ApplicationsReducer (state = initialState, action: Actions.ApplicationsActions) {
    switch (action.type) {
        case Actions.GET_APPLICATIONS_SUCCESS:
            return Object.assign([], state, action.payload);
        case Actions.ADD_SERVICE_SUCCESS:
            return [
                ...state.slice(0),
                action.payload
            ];
        case Actions.UPDATE_SERVICE_SUCCESS:
            return state.map(item => {
                if (item.id !== action.payload.id) {
                    return item;
                }

                return {
                    ...item,
                    ...action.payload
                };
            });
        case Actions.DELETE_APPLICATION_SUCCESS:
            return state.filter(service => service.id !== action.applicationId);

        case Actions.ADD_SERVICE_FAILURE:
        default:
            return state;
    }
}
