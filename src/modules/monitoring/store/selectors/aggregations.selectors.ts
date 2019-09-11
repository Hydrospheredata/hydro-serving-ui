import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';

export const selectFullAggregation = createSelector(
  fromRoot.getAggregationsState,
  state => state.full
);
export const selectDetailedAggregation = createSelector(
  fromRoot.getAggregationsState,
  state => state.detailed
);
