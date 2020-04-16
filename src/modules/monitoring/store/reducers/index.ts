import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromMetrics from './metrics.reducer';
import * as fromReqstore from './reqstore.reducer';
import * as fromServiceStatus from './service-status.reducer';

export interface State {
  metrics: fromMetrics.State;
  reqstore: fromReqstore.State;
  serviceStatus: fromServiceStatus.State;
}

export const reducer: ActionReducerMap<State> = {
  metrics: fromMetrics.reducer,
  reqstore: fromReqstore.reducer,
  serviceStatus: fromServiceStatus.reducer,
};

export const getMonitoringState = createFeatureSelector<State>('monitoring');
export const getMonitoringServiceStatusState = createSelector(
  getMonitoringState,
  state => state.serviceStatus
);

export const getMetricsState = createSelector(
  getMonitoringState,
  state => state.metrics
);
export const getReqstoreState = createSelector(
  getMonitoringState,
  state => state.reqstore
);
