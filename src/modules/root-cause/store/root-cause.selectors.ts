import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  selectRootCauseState,
} from './root-cause.reducer';

export const selectEntryMethods = (uid: string) =>
  createSelector(
    selectRootCauseState,
    state => {
      return state[uid];
    }
  );
