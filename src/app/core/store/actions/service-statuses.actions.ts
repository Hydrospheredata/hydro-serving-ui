import { createAction, props } from '@ngrx/store';
import {
  ModelVersion,
  ModelVersionServiceStatusesEntity,
} from '../../data/types';

export const Get = createAction(
  '[ServiceStatus] Get services statuses',
  props<{ payload: ModelVersion }>()
);
export const GetSuccess = createAction(
  '[ServiceStatus] Get services statuses with success',
  props<{ payload: ModelVersionServiceStatusesEntity }>()
);
export const GetFail = createAction(
  '[ServiceStatus] Get services statuses with fail',
  props<{ error: string }>()
);
