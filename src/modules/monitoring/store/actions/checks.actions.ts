import { CheckCollection } from '@monitoring/models';
import { createAction, props } from '@node_modules/@ngrx/store';

export const LoadChecks = createAction(
  '[Monitoring] load checks',
  props<{
    modelVersionId: number;
    from: string;
    to: string;
  }>()
);

export const LoadChecksSuccess = createAction(
  '[Monitoring] load checks success',
  props<{ checks: CheckCollection }>()
);

export const LoadChecksFailed = createAction(
  '[Monitoring] load checks failed',
  props<{ error: string }>()
);
