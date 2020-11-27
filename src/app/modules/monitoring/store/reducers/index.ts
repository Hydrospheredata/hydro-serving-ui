import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromAggregation from './aggregation.reducer';
import * as fromChecks from './checks.reducer';
import * as fromMetrics from './metrics.reducer';
import * as fromServiceStatus from './service-status.reducer';
import * as fromUi from './ui.reducer';

export interface State {
  aggregation: fromAggregation.State;
  metrics: fromMetrics.State;
  serviceStatus: fromServiceStatus.State;
  checks: fromChecks.State;
  ui: fromUi.State;
}

export const reducer: ActionReducerMap<State> = {
  aggregation: fromAggregation.reducer,
  metrics: fromMetrics.reducer,
  serviceStatus: fromServiceStatus.reducer,
  checks: fromChecks.reducer,
  ui: fromUi.reducer,
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

export const getAggregationState = createSelector(
  getMonitoringState,
  state => state.aggregation
);

export const getChecksState = createSelector(
  getMonitoringState,
  state => state.checks
);

export const getUiState = createSelector(getMonitoringState, state => state.ui);
