import { Application, HydroServingState } from '@shared/models/_index';
import { ApplicationActions, ApplicationActionTypes } from '@applications/actions/applications.actions';



export const initialState: Application[] = [];

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

                const updatedApplication = {
                    ...item,
                    ...action.payload
                };

                return new Application(updatedApplication);
            });
        case ApplicationActionTypes.DeleteSuccess:
            return state.filter(service => service.id !== action.applicationId);
        default:
            return state;
    }
}

export const getApplications = (state: HydroServingState) => state.applications;
