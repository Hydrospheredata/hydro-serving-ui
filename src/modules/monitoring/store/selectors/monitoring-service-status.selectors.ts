import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getMonitoringServiceStatus = createSelector(
  fromFeature.getMonitoringServiceStatusState,
  state => state.status
);
export const getMonitoringServiceError = createSelector(
  fromFeature.getMonitoringServiceStatusState,
  state => state.error
);
