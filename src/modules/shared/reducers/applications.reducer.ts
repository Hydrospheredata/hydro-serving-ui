import { Application } from '@shared/models/_index';
import { ApplicationActions, ApplicationActionTypes } from '@shared/actions/_index';



const initialState: Application[] = [];

export function ApplicationsReducer(state = initialState, action: ApplicationActions) {
    switch (action.type) {
        case ApplicationActionTypes.GetSuccess:
            return Object.assign([], state, action.payload);
        case ApplicationActionTypes.GetFail:
            return { ...state };
        case ApplicationActionTypes.AddSuccess:
            return [
                ...state.slice(0),
                action.payload
            ];
        case ApplicationActionTypes.UpdateSuccess:
            return state.map(item => {
                if (item.id !== action.payload.id) {
                    return item;
                }

                return {
                    ...item,
                    ...action.payload
                };
            });
        case ApplicationActionTypes.DeleteSuccess:
            return state.filter(service => service.id !== action.applicationId);
        default:
            return state;
    }
}
