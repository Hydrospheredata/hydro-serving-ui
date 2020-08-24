import { State } from './deployment-configs.state';
import * as fromRoot from '@core/store/selectors';

import {
  createFeatureSelector,
  createSelector,
} from '@node_modules/@ngrx/store';

const getFeatureState = createFeatureSelector<State>('deployment_configs');

const configsState = createSelector(getFeatureState, state => state);

export const selectAllConfigs = createSelector(
  configsState,
  state => state.configs
);

export const selectSelectedDeploymentConfig = createSelector(
  selectAllConfigs,
  fromRoot.selectRouterParams,
  (configs, router) => {
    return (
      router.params &&
      configs.find(config => config.name === router.params.name)
    );
  }
);
