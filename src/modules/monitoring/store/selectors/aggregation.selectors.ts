import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectAggregationList = createSelector(
  fromFeature.getAggregationState,
  state => {
    return state.aggregationList;
  }
);
export const selectSelectedAggregation = createSelector(
  fromFeature.getAggregationState,
  state => {
    return state.selectedAggregation;
  }
);
export const selectOffset = createSelector(
  fromFeature.getAggregationState,
  state => state.offset
);
