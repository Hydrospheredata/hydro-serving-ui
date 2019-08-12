import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMonitoring from '../reducers';

const monitoringState = createFeatureSelector<fromMonitoring.State>(
  'monitoring'
);

const monitoringServiceStatusState = createSelector(
  monitoringState,
  state => state.monitoringServiceStatus
);

export const getMonitoringServiceStatus = createSelector(
  monitoringServiceStatusState,
  state => state.status
);
export const getMonitoringServiceError = createSelector(
  monitoringServiceStatusState,
  state => state.error
);
