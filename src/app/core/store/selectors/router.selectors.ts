import { createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from '../states/router.state';

export const selectRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const selectRouterParams = createSelector(
  selectRouterState,
  router => router.state
);
