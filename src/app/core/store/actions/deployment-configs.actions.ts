import { createAction, props } from '@ngrx/store';
import { DeploymentConfig } from '../../data/types';

export const GetDeploymentConfigs = createAction(
  '[Deployment config] get all deployment configs'
);

export const GetDeploymentConfigsSuccess = createAction(
  '[Deployment config] get all succeed',
  props<{ configs: DeploymentConfig[] }>()
);

export const GetDeploymentConfigsFail = createAction(
  '[Deployment config] get all failed',
  props<{ error: string }>()
);

export const DeleteDeploymentConfig = createAction(
  '[Deployment config] delete',
  props<{ name: string }>()
);

export const DeleteDeploymentConfigSuccess = createAction(
  '[Deployment config] successful deletion',
  props<{ name: string }>()
);

export const DeleteDeploymentConfigFail = createAction(
  '[Deployment config] failed deletion'
);

export const UpdateDeploymentConfig = createAction(
  '[Deployment config] update',
  props<{ config: DeploymentConfig }>()
);

export const UpdateSelectedConfig = createAction(
  '[Deployment config] update selected',
  props<{ name: string, config: DeploymentConfig }>()
);
