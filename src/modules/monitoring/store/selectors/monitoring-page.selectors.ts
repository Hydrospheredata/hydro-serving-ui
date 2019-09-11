import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectTimeInterval = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.timeInterval
);
export const selectDetailedTimeInterval = createSelector(
  fromFeature.getMonitoringPageState,
  state => {
    return state.detailedTimeInterval;
  }
);
export const selectTimeBound = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.timeBound
);

export const selectIsLive = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.live
);
