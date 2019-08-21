import { createAction, props } from '@ngrx/store';
import { TimeInterval, SonarMetricData } from '@shared/_index';
import { ReqstoreLog } from '@shared/models/reqstore.model';

export const ClearPage = createAction('[Monitoring page] clear');
export const LoadMetrics = createAction(
  '[Monitoring page] load metrics',
  props<{ modelVersionId: number }>()
);
export const LoadMetricsSuccess = createAction(
  '[Monitoring page] load metrics success',
  props<{ metricSettings: any }>()
);
export const LoadMetricsFailed = createAction(
  '[Monitoring page] load metrics failed',
  props<{ error: string }>()
);
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

/* aggregations for timeline */

export const LoadFullAggregation = createAction(
  '[Monitoring page] load full aggregation',
  props<{ timeBoundary }>()
);
export const LoadFullAggregationSuccess = createAction(
  '[Monitoring page] load full aggregation success',
  props<{ fullAggregation: any }>()
);
export const LoadFullAggregationFailed = createAction(
  '[Monitoring page] load full aggregation failed',
  props<{ error: string }>()
);
export const LoadDetailedAggreagation = createAction(
  '[Monitoring page] load detailed aggregation',
  props<{ timeInterval: TimeInterval }>()
);
export const LoadDetailedAggregationSuccess = createAction(
  '[Monitoring page] load detailed aggregation success',
  props<{ detailedAggregation: any }>()
);
export const LoadDetailedAggregationFailed = createAction(
  '[Monitoring page] load detailed aggregation failed',
  props<{ error: string }>()
);

/* sonar */

export const LoadSonarData = createAction('[Monitoring page] load sonar data');
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

/* reqstore */
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

export const StopAutoUpdate = createAction(
  '[Monitoring page] stopped auto regime'
);

export const StartAutoUpdate = createAction(
  '[Monitoring page] started auto regime'
);

export const addComparedModelVersionId = createAction(
  '[Monitoring page] added compared model version id',
  props<{
    metricSpecId: string;
    modelVersionId: number;
    metricSpecKind: string;
  }>()
);

export const ComparedMetricsLoadSuccess = createAction(
  '[Monitoring page] compared metrics loaded success',
  props<{ modelVersionId: number; metrics: any }>()
);
