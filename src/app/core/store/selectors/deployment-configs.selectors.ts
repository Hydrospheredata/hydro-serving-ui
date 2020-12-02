import { State } from '../states/deployment-configs.state';
import { selectRouterParams } from './router.selectors';

import { createFeatureSelector, createSelector } from '@ngrx/store';

const getFeatureState = createFeatureSelector<State>('deploymentConfigs');

const configsState = createSelector(getFeatureState, state => state);

export const selectAllConfigs = createSelector(
  configsState,
  state => state.configs
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
