import { createAction, props } from '@ngrx/store';
import { ExplanationRequestBody } from '../interfaces';
import { Explanation } from '../models';

export const GetExplanation = createAction(
  '[Root cause] get explanation',
  props<{ requestBody: ExplanationRequestBody }>()
);
export const GetExplanationSuccess = createAction(
  '[Root cause] get explanation success',
  props<{ explanation: Explanation }>()
);
export const GetExplanationFailed = createAction(
  '[Root cause] get explanation failed',
  props<{ error: string }>()
);
