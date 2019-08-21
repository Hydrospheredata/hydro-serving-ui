import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromMonitoringPage from './monitoring-page.reducer';
import * as fromMonitoringServiceStatus from './monitoring-service-status.reducer';

export interface State {
  monitoringServiceStatus: fromMonitoringServiceStatus.State;
  monitoringPage: fromMonitoringPage.State;
}

export const reducer: ActionReducerMap<State> = {
  monitoringServiceStatus: fromMonitoringServiceStatus.reducer,
  monitoringPage: fromMonitoringPage.reducer,
};

export const getMonitoringState = createFeatureSelector<State>('monitoring');
export const getMonitoringServiceStatusState = createSelector(
  getMonitoringState,
  state => state.monitoringServiceStatus
);
export const getMonitoringPageState = createSelector(
  getMonitoringState,
  state => state.monitoringPage
);
