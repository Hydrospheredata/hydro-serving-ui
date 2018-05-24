import * as fromApplications from './applications.reducer';
import * as fromRoot from '@core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Application } from '@shared/models/_index';

export interface ApplicationsState {
    applications: fromApplications.State;
}

export interface State extends fromRoot.HydroServingState {
    applications: ApplicationsState
}

export const reducers: ActionReducerMap<ApplicationsState> = {
    applications: fromApplications.reducer
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

export const getSelectedApplicationId = createSelector(
    getSelectedApplication,
    (application: Application): number => application.id
)
