import { Action } from '@ngrx/store';
import {
  IMetricSpecificationRequest,
  MetricSpecification,
} from '@shared/models/metric-specification.model';

export enum MonitoringActionTypes {
  AddMetric = '[Metrics] Add metric',
  AddMetricSuccess = '[Metrics] Add metric with success',
  AddMetricFail = '[Metrics] Add metric with fail',
  EditMetric = '[Metrics] Edit metric',
  EditMetricSuccess = '[Metrics] Edit metric with success',
  EditMetricFail = '[Metrics] Edit metric with fail',
  GetMetrics = '[Metrics] Get metrics',
  GetMetricsSuccess = '[Metrics] Get metric with success',
  GetMetricsFail = '[Metrics] Get metric with fail',
  DeleteMetric = '[Metrics] Delete metric',
  DeleteMetricSuccess = '[Metrics] Delete metric with success',
  DeleteMetricFail = '[Metrics] Delete metric with fail',
}

export class AddMetricAction implements Action {
  readonly type = MonitoringActionTypes.AddMetric;
  constructor(public aggregation: IMetricSpecificationRequest) {}
}

export class AddMetricSuccessAction implements Action {
  readonly type = MonitoringActionTypes.AddMetricSuccess;
  constructor(public payload: MetricSpecification) {}
}
export class AddMetricFailAction implements Action {
  readonly type = MonitoringActionTypes.AddMetricFail;
  constructor(public error) {}
}

export class EditMetricAction implements Action {
  readonly type = MonitoringActionTypes.EditMetric;
  constructor(public aggregation: IMetricSpecificationRequest) {}
}

export class EditMetricSuccessAction implements Action {
  readonly type = MonitoringActionTypes.EditMetricSuccess;
  constructor(public payload: MetricSpecification) {}
}

export class EditMetricFailAction implements Action {
  readonly type = MonitoringActionTypes.EditMetricFail;
  constructor(public error) {}
}

export class GetMetricsAction implements Action {
  readonly type = MonitoringActionTypes.GetMetrics;
  constructor(public modelVersionId: string) {}
}

export class GetMetricsSuccessAction implements Action {
  readonly type = MonitoringActionTypes.GetMetricsSuccess;
  constructor(public payload: MetricSpecification[]) {}
}

export class GetMetricsFailAction implements Action {
  readonly type = MonitoringActionTypes.GetMetricsFail;
  constructor(public error) {}
}

export class DeleteMetricAction implements Action {
  readonly type = MonitoringActionTypes.DeleteMetric;
  constructor(public id: string) {}
}

export class DeleteMetricSuccessAction implements Action {
  readonly type = MonitoringActionTypes.DeleteMetricSuccess;
  constructor(public payload: { id: string }) {}
}

export class DeleteMetricFailAction implements Action {
  readonly type = MonitoringActionTypes.DeleteMetricFail;
  constructor(public error) {}
}

export type MonitoringActions =
  | GetMetricsAction
  | GetMetricsSuccessAction
  | GetMetricsFailAction
  | AddMetricAction
  | AddMetricSuccessAction
  | AddMetricFailAction
  | EditMetricAction
  | EditMetricSuccessAction
  | EditMetricFailAction
  | DeleteMetricAction
  | DeleteMetricSuccessAction
  | DeleteMetricFailAction;
