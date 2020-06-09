import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { selectChecks } from './checks.selectors';

export const selectCheckIdToShow = createSelector(
  fromFeature.getUiState,
  state => state.checksIdToShow
);

export const selectCheckToShowInDetails = createSelector(
  selectChecks,
  selectCheckIdToShow,
  (checks, checkId) => {
    return checks && checks.getChecks().find(check => check.id === checkId);
  }
);
