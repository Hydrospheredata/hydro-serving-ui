import { Action, createReducer, on } from '@ngrx/store';

import {
  GetDeploymentConfigs,
  GetDeploymentConfigsSuccess,
  DeleteDeploymentConfigSuccess,
  GetDeploymentConfigsFail,
  AddDeploymentConfigSuccess,
} from '../actions/deployment-configs.actions';

import { State, initialState, adapter } from '../states/deployment-configs.state';

export const deploymentConfigReducer = createReducer(
  initialState,
  on(GetDeploymentConfigs, state => ({ ...state, loading: true })),
  on(GetDeploymentConfigsSuccess, (state, { payload}) => {
    return adapter.setAll(payload, {...state, loaded: true, loading: false});
  }),
  on(GetDeploymentConfigsFail, state => ({ ...state, loading: false })),
  on(DeleteDeploymentConfigSuccess, (state, { name}) => {
    return adapter.removeOne(name, state);
  }),
  on(AddDeploymentConfigSuccess, (state, { payload }) => {
    return adapter.addOne(payload, state);
  })
);

export function reducer(state: State, action: Action): State {
  return deploymentConfigReducer(state, action);
}
