import { Application } from '@shared/models/_index';
import { ApplicationActions, ApplicationActionTypes } from '@applications/actions/applications.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ApplicationsState {
    applications: Application[];
}

export const initialState: ApplicationsState = {
    applications: []
};

export function ApplicationsReducer(state = initialState, action: ApplicationActions) {
    switch (action.type) {
        case ApplicationActionTypes.GetSuccess:
            return { ...state, applications: action.payload };
        case ApplicationActionTypes.GetFail:
            return { ...state };
        case ApplicationActionTypes.AddSuccess:
            return {
                ...state,
                applications: [...state.applications, action.payload]
            };
        case ApplicationActionTypes.UpdateSuccess:
            return {
                ...state,
                applications: [...state.applications.map(item => {
                    if (item.id !== action.payload.id) {
                        return item;
                    }

                    return { ...item, ...action.payload };
                })]
            };
        case ApplicationActionTypes.DeleteSuccess:
            const index = state.applications.findIndex(application => application.id === action.applicationId);
            return {
                ...state,
                applications: [...state.applications.slice(0, index), ...state.applications.slice(index + 1, state.applications.length)]
            };
        default:
            return state;
    }
}

export const getApplicationState = createFeatureSelector<ApplicationsState>('applications');

export const getApplicationEntitiesState = createSelector(
    getApplicationState,
    state => state.applications
);

export const getAllApplications = createSelector(
    getApplicationEntitiesState,
    applications => applications
);

export const getApplicationById = (id: number) => createSelector(
    getApplicationEntitiesState,
    (applications) => applications.find(item => item.id === id)
);
