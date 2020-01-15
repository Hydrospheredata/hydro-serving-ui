import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromMetrics from './metrics.reducer';
import * as fromMonitoringPage from './monitoring-page.reducer';
import * as fromReqstore from './reqstore.reducer';
import * as fromServiceStatus from './service-status.reducer';
import * as fromSonar from './sonar.reducer';

export interface State {
  metrics: fromMetrics.State;
  monitoringPage: fromMonitoringPage.State;
  reqstore: fromReqstore.State;
  serviceStatus: fromServiceStatus.State;
  sonar: fromSonar.State;
}

export const reducer: ActionReducerMap<State> = {
  metrics: fromMetrics.reducer,
  monitoringPage: fromMonitoringPage.reducer,
  reqstore: fromReqstore.reducer,
  serviceStatus: fromServiceStatus.reducer,
  sonar: fromSonar.reducer,
};

export const getMonitoringState = createFeatureSelector<State>('monitoring');
export const getMonitoringServiceStatusState = createSelector(
  getMonitoringState,
  state => state.serviceStatus
);
export const getMonitoringPageState = createSelector(
  getMonitoringState,
  state => state.monitoringPage
);
export const getMetricsState = createSelector(
  getMonitoringState,
  state => state.metrics
);
export const getSonarState = createSelector(
  getMonitoringState,
  state => state.sonar
);
export const getReqstoreState = createSelector(
  getMonitoringState,
  state => state.reqstore
);
