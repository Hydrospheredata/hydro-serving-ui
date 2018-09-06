import * as fromApplications from './applications.reducer';
import * as fromRoot from '@core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Application } from '@shared/models/_index';

export interface ApplicationsState {
    applications: fromApplications.State;
    fetchStatus: fromApplications.IApplicationFetchStatus;
}

export interface State extends fromRoot.HydroServingState {
    applications: ApplicationsState
}

export const reducers: ActionReducerMap<ApplicationsState> = {
    applications: fromApplications.reducer,
    fetchStatus: fromApplications.applicationFetchStatusReducer
}

export const getApplicationState = createFeatureSelector<ApplicationsState>('applications');

export const getApplicationEntitiesState = createSelector(
    getApplicationState,
    state => state.applications
);

export const {
    selectEntities: getApplicationEntities,
    selectAll: getAllApplications,
    selectTotal: getTotalApplications,
} = fromApplications.adapter.getSelectors(getApplicationEntitiesState);

export const getSelectedApplication = createSelector(
    getApplicationEntities,
    fromRoot.getRouterState,
    (entities, router): Application => router.state && entities[router.state.params.id]
);

export const getSelectedStageId = createSelector(
    fromRoot.getRouterState,
    (router) => router.state && router.state.params.stageId
);

export const getSelectedApplicationName = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.name
);

export const getSelectedApplicationSignatureName = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.contract.match(/signature_name: \"(.*)\"\n/)[1]
);

export const getSelectedApplicationId = createSelector(
    getSelectedApplication,
    (application: Application): number => application && application.id
)

export const getSelectedApplicationInput = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.input
)

export const getSelectedApplicationOutput = createSelector(
    getSelectedApplication,
    (application: Application): string => application && application.output
)

export const getCurrentStage = createSelector(
    getSelectedApplication,
    getSelectedStageId,
    (application: Application, stageId) => application && application.executionGraph.stages[stageId]
)

export const getApplicationFetchStatus = createSelector(
    getApplicationState,
    state => state.fetchStatus
);