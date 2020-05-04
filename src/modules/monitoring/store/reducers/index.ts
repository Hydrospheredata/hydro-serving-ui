import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromMetrics from './metrics.reducer';
import * as fromServiceStatus from './service-status.reducer';

export interface State {
  metrics: fromMetrics.State;
  serviceStatus: fromServiceStatus.State;
}

export const reducer: ActionReducerMap<State> = {
  metrics: fromMetrics.reducer,
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
