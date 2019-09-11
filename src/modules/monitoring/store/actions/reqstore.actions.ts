import { createAction, props } from '@ngrx/store';
import { ReqstoreLog } from '@shared/models/reqstore.model';

export const LoadReqstoreData = createAction(
  '[Monitoring page] load reqstore data',
  props<{
    maxMBytes: number;
    maxMessages: number;
    reverse: boolean;
  }>()
);
export const LoadReqstoreDataSuccess = createAction(
  '[Monitoring page] load reqstore data success',
  props<{ reqstoreData: ReqstoreLog }>()
);
export const LoadReqstoreDataFailed = createAction(
  '[Monitoring page] load reqstore data failed',
  props<{ error: string }>()
);
