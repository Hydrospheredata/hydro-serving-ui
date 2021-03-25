import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from '../states/service-statuses.state';

const state = createFeatureSelector<State>('serviceStatuses');
const { selectEntities } = adapter.getSelectors();

export const allStatuses = createSelector(state, selectEntities)
export const selectServiceStatusesById = (id: number) =>
  createSelector(allStatuses, entities => entities[id]
);
