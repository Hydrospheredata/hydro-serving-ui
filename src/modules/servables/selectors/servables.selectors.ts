import { selectRouterState } from '@core/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from '../reducer';
import { State } from '../state';

export const selectServablesState = createFeatureSelector<State>('servables');

const { selectEntities, selectAll } = adapter.getSelectors();

export const selectAllServables = createSelector(
  selectServablesState,
  selectAll
);
export const selectServablesEntities = createSelector(
  selectServablesState,
  selectEntities
);
export const selectCurrentServable = createSelector(
  selectServablesEntities,
  selectRouterState,
  (state, router) => {
    try {
      return state[router.state.params.name];
    } catch {
      return null;
    }
  }
);
export const selectServablesByModelVersionId = (id: number) =>
  createSelector(
    selectAllServables,
    state => state.filter(servable => servable.modelVersion.id === id)
  );
