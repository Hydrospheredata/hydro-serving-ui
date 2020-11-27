import { createAction, props } from '@ngrx/store';

export const ShowCheckDetails = createAction(
  '[Monitoring] show check details',
  props<{
    checkId: string;
  }>()
);

export const CloseCheckDetails = createAction(
  '[Monitoring] close check details'
);
