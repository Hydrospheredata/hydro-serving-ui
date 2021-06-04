import { createAction, props } from '@ngrx/store';
import { ModelVersionId, ModelVersionServiceStatusesEntity} from '../../data/types';

export const Get = createAction(
  '[ServiceStatus] Get services statuses',
  props<{ payload: ModelVersionId }>()
);
export const GetSuccess = createAction(
  '[ServiceStatus] Get services statuses with success',
  props<{ payload: ModelVersionServiceStatusesEntity }>()
);
export const GetFail = createAction(
  '[ServiceStatus] Get services statuses with fail',
  props<{ error: string }>()
);

