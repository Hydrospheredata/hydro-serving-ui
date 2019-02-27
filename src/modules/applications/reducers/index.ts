import * as fromRoot from '@core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Application, TestStatus } from '@shared/models/_index';
import * as fromApplications from './applications.reducer';

export interface ApplicationsState {
    applications: fromApplications.State;
}

export interface State extends fromRoot.HydroServingState {
    applications: ApplicationsState;
}

export const reducers: ActionReducerMap<ApplicationsState> = {
    applications: fromApplications.reducer,
};

export const getApplicationState = createFeatureSelector<ApplicationsState>('applications');

export const getApplicationEntitiesState = createSelector(
    getApplicationState,
    state => state.applications
);

export const getApplicationEntitiesLoaded = createSelector(
    getApplicationEntitiesState,
    state => state.loaded
);

export const {
    selectEntities: getApplicationEntities,
    selectAll: getAllApplications,
    selectTotal: getTotalApplications,
} = fromApplications.adapter.getSelectors(getApplicationEntitiesState);

export const getSelectedApplication = createSelector(
    getApplicationEntities,
    fromRoot.getRouterState,
    (entities, router): Application => router.state && entities[router.state.params.name]
);

export const getSelectedApplicationName = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.name
);

export const getSelectedApplicationSignatureName = createSelector(
    getSelectedApplication,
    (application: Application): string => {
       return application && application.signature.signatureName;
    }
);

export const getSelectedApplicationId = createSelector(
    getSelectedApplication,
    (application: Application): number => application && application.id
);

export const getSelectedApplicationInput = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.input
);

export const getSelectedApplicationOutput = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.output
);

export const getSelectedApplicationTestStatus = createSelector(
    getSelectedApplication,
    (application: Application): TestStatus => application && application.testStatus
);
