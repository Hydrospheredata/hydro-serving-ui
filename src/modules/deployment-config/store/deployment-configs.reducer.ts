import { Action, createReducer, on } from '@node_modules/@ngrx/store';
import {
  GetDeploymentConfigs,
  GetDeploymentConfigsSuccess,
  DeleteDeploymentConfigSuccess,
} from './deployment-configs.actions';
import { State, initialState } from './deployment-configs.state';

export const deploymentConfigReducer = createReducer(
  initialState(),
  on(GetDeploymentConfigs, state => {
    return state;
  }),
  on(GetDeploymentConfigsSuccess, (state, payload) => {
    return { ...state, configs: payload.configs };
  }),
  on(DeleteDeploymentConfigSuccess, (state, payload) => {
    return {
      ...state,
      configs: state.configs.filter(config => {
        return config.name !== payload.name;
      }),
    };
  })
);

export function reducer(state: State, action: Action): State {
  return deploymentConfigReducer(state, action);
}
