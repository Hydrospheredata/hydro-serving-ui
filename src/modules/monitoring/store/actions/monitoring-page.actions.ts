import { createAction, props } from '@ngrx/store';
import { TimeInterval } from '@shared/_index';

export const ClearPage = createAction('[Monitoring page] clear');
export const LoadData = createAction('[Monitoring page] load data');

export const SetTimeInterval = createAction(
  '[Monitoring page] set timeinterval',
  props<{ timeInterval: TimeInterval }>()
);
export const SetDetailedTimeInterval = createAction(
  '[Monitoring page] set detailed timeInterval',
  props<{ timeInterval: TimeInterval }>()
);
export const SetTimeBound = createAction(
  '[Monitoring page] set time bound',
  props<{ timeBound: number }>()
);

export const StopAutoUpdate = createAction(
  '[Monitoring page] stopped auto regime'
);

export const StartAutoUpdate = createAction(
  '[Monitoring page] started auto regime'
);
