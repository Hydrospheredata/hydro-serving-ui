import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouterState } from '../selectors/router.selectors';
import { State, adapter } from '../states/servables.state';

export const selectServablesState = createFeatureSelector<State>('servables');

const { selectEntities, selectAll } = adapter.getSelectors();

export const selectAllServables = createSelector(
  selectServablesState,
  selectAll,
);

export const selectServablesEntities = createSelector(
  selectServablesState,
  selectEntities,
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
  },
);
export const selectServablesByModelVersionId = (id: number) =>
  createSelector(selectAllServables, state =>
    state.filter(servable => servable.modelVersionId === id),
  );

export const selectServablesByName = (name: string) =>
  createSelector(selectAllServables, state =>
    state.filter(servable => servable.fullName === name),
  );
