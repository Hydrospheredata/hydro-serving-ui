import { createAction, props } from '@ngrx/store';

export const GetServiceStatusAction = createAction(
  '[Monitoring service] get status'
);
export const SetStatusToAvailableAction = createAction(
  '[Monitoring service] is available'
);
export const SetStatusToFailedAction = createAction(
  '[Monitoring service] is failed',
  props<{ error: string }>()
);
export const SetStatusToClosedForOSSAction = createAction(
  '[Monitoring service] is close for OSS'
);
