import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  selectExplanationJobsEntities,
} from './root-cause.reducer';
const getRootCauseState = createFeatureSelector<State>('rootCause');

const getEntities = createSelector(
  getRootCauseState,
  selectExplanationJobsEntities
);

export const getExplanationJobById = (uid: string) =>
  createSelector(
    getEntities,
    entities => {
      return entities[uid];
    }
  );
