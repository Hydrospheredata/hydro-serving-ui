import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducer';
const getRootCauseState = createFeatureSelector<State>('rootCause');

export const getExplanation = createSelector(
  getRootCauseState,
  state => state.explanation
);

export const isLoading = createSelector(
  getRootCauseState,
  state => state.loading
);

export const getError = createSelector(
  getRootCauseState,
  state => state.error
);
