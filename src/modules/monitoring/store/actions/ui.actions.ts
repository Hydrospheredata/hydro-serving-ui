import { createAction, props } from '@node_modules/@ngrx/store';

export const ShowCheckDetails = createAction(
  '[Monitoring] show check details',
  props<{
    checkId: string;
  }>()
);

export const CloseCheckDetails = createAction(
  '[Monitoring] close check details'
);
