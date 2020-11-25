import { createAction, props } from '@ngrx/store';

import { CheckCollection } from '../../models';

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
