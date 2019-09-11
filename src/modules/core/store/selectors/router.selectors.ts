import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';

export const selectRouterParams = createSelector(
  fromRoot.selectRouterState,
  router => router.state
);
