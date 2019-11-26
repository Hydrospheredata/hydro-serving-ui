import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAggregation from './aggreagation.reducer';
import * as fromCharts from './charts.reducer';
import * as fromMetrics from './metrics.reducer';
import * as fromMonitoringPage from './monitoring-page.reducer';
import * as fromReqstore from './reqstore.reducer';
import * as fromServiceStatus from './service-status.reducer';
import * as fromSonar from './sonar.reducer';

export interface State {
  aggregation: fromAggregation.State;
  charts: fromCharts.State;
  metrics: fromMetrics.State;
  monitoringPage: fromMonitoringPage.State;
  reqstore: fromReqstore.State;
  serviceStatus: fromServiceStatus.State;
  sonar: fromSonar.State;
}

export const reducer: ActionReducerMap<State> = {
  aggregation: fromAggregation.reducer,
  charts: fromCharts.reducer,
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
export const getChartsState = createSelector(
  getMonitoringState,
  state => state.charts
);
export const getAggregationsState = createSelector(
  getMonitoringState,
  state => state.aggregation
);
export const getSonarState = createSelector(
  getMonitoringState,
  state => state.sonar
);
export const getReqstoreState = createSelector(
  getMonitoringState,
  state => state.reqstore
);
