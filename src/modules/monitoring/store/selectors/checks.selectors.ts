import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectChecks = createSelector(
  fromFeature.getChecksState,
  state => {
    return state.checks;
  }
);
