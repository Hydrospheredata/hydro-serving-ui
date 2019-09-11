import { createAction, props } from '@ngrx/store';
import { TimeInterval, SonarMetricData } from '@shared/_index';

export const LoadSonarData = createAction(
  '[Monitoring page] load sonar data',
  props<{ timeInterval: TimeInterval }>()
);
export const LoadSonarDataSuccess = createAction(
  '[Monitoring page] load sonar data success',
  props<{ sonarData: { [metricSpecId: string]: SonarMetricData[] } }>()
);
export const LoadSonarDataFailed = createAction(
  '[Monitoring page] load sonar data failed',
  props<{ error: string }>()
);

export const LoadComparedSonarData = createAction(
  '[Monitoring page] load compared sonar data'
);
export const LoadComparedSonarDataSuccess = createAction(
  '[Monitoring page] load compared sonar data success',
  props<{ comparedSonarData: any }>()
);
