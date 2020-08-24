import { createAction, props } from '@node_modules/@ngrx/store';
import { DeploymentConfig } from '../models';

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
