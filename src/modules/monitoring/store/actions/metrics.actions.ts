import { createAction, props } from '@ngrx/store';
import {
  IMetricSpecificationRequest,
  MetricSpecification,
} from '@shared/models/metric-specification.model';

export const AddMetric = createAction(
  '[Metrics] add metric',
  props<{ aggreagation: IMetricSpecificationRequest}>()
);
export const AddMetricSuccess = createAction(
  '[Metrics] add metric success',
  props<{ payload: MetricSpecification}>()
);
export const AddMetricFail = createAction(
  '[Metrics] add metric fail',
  props<{ error: string}>()
);
export const EditMetric = createAction(
  '[Metrics] edit metric',
  props<{ aggregation: IMetricSpecificationRequest}>()
);
export const EditMetricSuccess = createAction(
  '[Metrics] edit metric success',
  props<{ payload: MetricSpecification}>()
);
export const EditMetricFail = createAction(
  '[Metrics] edit metric fail',
  props<{ error: string}>()
);
export const LoadMetrics = createAction(
  '[Metrics] get metrics'
);
export const LoadMetricsSuccess = createAction(
  '[Metrics] get metrics success',
  props<{payload: MetricSpecification[]}>()
);
export const LoadMetricsFail = createAction(
  '[Metrics] get metrics fail',
  props<{error: string}>()
);
export const DeleteMetric = createAction(
  '[Metrics] delete metric',
  props<{id: string}>()
);
export const DeleteMetricSuccess = createAction(
  '[Metrics] delete metric success',
  props<{payload: {id: string}}>()
);
export const DeleteMetricFail = createAction(
  '[Metrics] delete metric',
  props<{error: string}>()
);
