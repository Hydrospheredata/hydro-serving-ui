import { createAction, props } from '@ngrx/store';
import { ExplanationRequestBody } from '../interfaces';
import { Explanation, ExplanationJob, ExplanationType } from '../models';

export const QueueExplanation = createAction(
  '[Root cause] queue explanation',
  props<{
    uid: string;
    requestBody: ExplanationRequestBody;
    explanationType: ExplanationType;
  }>()
);

export const GetStatus = createAction(
  '[Root cause] get status',
  props<{ body: ExplanationRequestBody}>()
);
export const GetStatusSuccess = createAction(
  '[Root cause] get status success',
  props<{ result: any }>()
);
export const GetStatusFailed = createAction(
  '[Root cause] get status failed',
  props<{ error: any }>()
);

export const QueueExplanationSuccess = createAction(
  '[Root cause] Queue explanation success',
  props<{ job: ExplanationJob }>()
);

export const QueueExplanationFailed = createAction(
  '[Root cause] get explanation failed',
  props<{ uid: string; error: string }>()
);

export const JobStatusChanged = createAction(
  '[Root cause] job status changed',
  props<{ uid: string; status: string }>()
);

export const JobPending = createAction(
  '[Root cause] job pending',
  props<{ uid: string }>()
);
export const JobStarted = createAction(
  '[Root cause] job started',
  props<{ uid: string; progress: number }>()
);
export const JobFinished = createAction(
  '[Root cause] job finished',
  props<{ uid: string; resultId: string, explanationType: ExplanationType }>()
);

export const JobFailed = createAction(
  '[Root cause] job failed',
  props<{ uid: string; error: string }>()
);

export const GetResult = createAction(
  '[Root cause] get resul',
  props<{ job: ExplanationJob }>()
);
export const GetResultSuccess = createAction(
  '[Root cause] get resul success',
  props<{ uid: string; explanation: Explanation }>()
);
export const GetResultFailed = createAction(
  '[Root cause] get resul failed',
  props<{ uid: string; error: string }>()
);
