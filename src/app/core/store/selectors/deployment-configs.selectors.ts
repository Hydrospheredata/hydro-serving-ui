import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from '../states/deployment-configs.state';
import { selectRouterParams } from './router.selectors';

const state = createFeatureSelector<State>('deploymentConfigs');

const { selectAll } = adapter.getSelectors();

export const selectAllConfigs = createSelector(state, selectAll);

export const selectDepConfigLoaded = createSelector(
  state,
  state => state.loaded
);

export const selectSelectedDeploymentConfig = createSelector(
  selectAllConfigs,
  selectRouterParams,
  (configs, router) => {
    return (
      router.params &&
      configs.find(config => config.name === router.params.name)
    );
  }
);
