import { createAction, props } from '@ngrx/store';
import { DeploymentConfig } from '../../data/types';

export const GetDeploymentConfigs = createAction(
  '[Deployment config] get all deployment configs',
);
export const GetDeploymentConfigsSuccess = createAction(
  '[Deployment config] get all succeed',
  props<{ payload: DeploymentConfig[] }>(),
);
export const GetDeploymentConfigsFail = createAction(
  '[Deployment config] get all failed',
  props<{ error: string }>(),
);

export const DeleteDeploymentConfig = createAction(
  '[Deployment config] delete',
  props<{ name: string }>(),
);
export const DeleteDeploymentConfigSuccess = createAction(
  '[Deployment config] successful deletion',
  props<{ name: string }>(),
);
export const DeleteDeploymentConfigFail = createAction(
  '[Deployment config] failed deletion',
  props<{ error: string }>(),
);

export const AddDeploymentConfig = createAction(
  '[Deployment config] add deployment configuration',
  props<{ depConfig: DeploymentConfig }>(),
);
export const AddDeploymentConfigSuccess = createAction(
  '[Deployment config] add deployment configuration with success',
  props<{ payload: DeploymentConfig }>(),
);
export const AddDeploymentConfigFail = createAction(
  '[Deployment config] add deployment configuration with fail',
  props<{ error: string }>(),
);
export const ToggleFavorite = createAction(
  '[Deployment config] toggleFavorite',
  props<{ payload: { depConfig: DeploymentConfig } }>(),
);
