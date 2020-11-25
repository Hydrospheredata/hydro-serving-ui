import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectChecks = createSelector(
  fromFeature.getChecksState,
  state => {
    return state.checks;
  }
);

export const selectChecksLoading = createSelector(
  fromFeature.getChecksState,
  state => {
    return state.loading;
  }
);
