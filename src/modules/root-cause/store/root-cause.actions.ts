import { createAction, props } from '@ngrx/store';
import { Explanation } from 'elasticsearch';
import { ExplanationRequestBody, GetAllStatusesParams } from '../interfaces';
import { ExplanationTask } from '../models';

export const GetStatuses = createAction(
  '[Root cause] get all statuses for entry',
  props<{ params: GetAllStatusesParams }>()
);
export const GetStatusesSuccess = createAction(
  '[Root cause] get all statuses for entry success',
  props<{ uid: string; tasks: ExplanationTask[] }>()
);
export const GetStatusesFailed = createAction(
  '[Root cause] get all statuses for entry failed',
  props<{ uid: string; error: string }>()
);

export const CreateExplanationTask = createAction(
  '[Root cause] create explanation task',
  props<{
    uid: string;
    requestBody: ExplanationRequestBody;
    method: string;
  }>()
);
export const CreateExplanationTaskSuccess = createAction(
  '[Root cause] Queue explanation success',
  props<{ uid: string; taskId: string; method: string }>()
);
export const CreateExplanationTaskFailed = createAction(
  '[Root cause] get explanation failed',
  props<{ uid: string; error: string; method: string }>()
);

export const GetStatus = createAction(
  '[Root cause] get status',
  props<{ body: ExplanationRequestBody }>()
);

export const GetStatusSuccess = createAction(
  '[Root cause] get status success',
  props<{ result: any }>()
);
export const GetStatusFailed = createAction(
  '[Root cause] get status failed',
  props<{ error: any }>()
);

export const JobStatusChanged = createAction(
  '[Root cause] job status changed',
  props<{ uid: string; status: string }>()
);

export const JobPending = createAction(
  '[Root cause] job pending',
  props<{ uid: string; method: string }>()
);
export const JobStarted = createAction(
  '[Root cause] job started',
  props<{ uid: string; progress: number; method: string }>()
);
export const JobFinished = createAction(
  '[Root cause] job finished',
  props<{ uid: string; result: string; method: string }>()
);

export const JobFailed = createAction(
  '[Root cause] job failed',
  props<{ uid: string; error: string; method: string }>()
);

export const GetResult = createAction(
  '[Root cause] get result',
  props<{ uid: string; result: string; method: string }>()
);
export const GetResultSuccess = createAction(
  '[Root cause] get result success',
  props<{ uid: string; explanation: Explanation; method: string }>()
);
export const GetResultFailed = createAction(
  '[Root cause] get resul failed',
  props<{ uid: string; error: string; method: string }>()
);

export const ContinuePollingExplanationTask = createAction(
  '[Root cause] continue polling task',
  props<{ uid: string; taskId: string; method: string }>()
);
