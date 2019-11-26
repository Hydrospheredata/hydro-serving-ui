import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectApplicationUIState = createSelector(
  fromFeature.selectApplicationState,
  state => state.ui
);

export const selectTestingDialogState = createSelector(
  selectApplicationUIState,
  state => state.testingDialog
);
