import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from '../states/service-statuses.state';

const state = createFeatureSelector<State>('serviceStatuses');
const { selectEntities } = adapter.getSelectors();

export const allStatusesEntities = createSelector(state, selectEntities);

export const selectServiceStatusesById = (id: number) =>
  createSelector(allStatusesEntities, entities => entities[id]

