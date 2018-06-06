import { Action } from '@ngrx/store';
// import { MonitoringDictionary } from '@shared/models/monitoring-dictionary.model';
import { MetricSettings } from '@shared/models/metric-settings.model';

export enum MonitoringActionTypes {
    AddMetric = '[Metrics] Add metric',
    AddMetricSuccess = '[Metrics] Add metric with success',
    AddMetricFail = '[Metrics] Add metric with fail',
    GetMetrics = '[Metrics] Get metrics',
    GetMetricsSuccess = '[Metrics] Get metric with success',
    GetMetricsFail = '[Metrics] Get metric with fail',
};

export class AddMetricAction implements Action {
    readonly type = MonitoringActionTypes.AddMetric;
    constructor(public aggregation: MetricSettings) { }
}

export class AddMetricSuccessAction implements Action {
    readonly type = MonitoringActionTypes.AddMetricSuccess;
    constructor(public payload: MetricSettings) { }
}

export class AddMetricFailAction implements Action {
    readonly type = MonitoringActionTypes.AddMetricFail;
    constructor(public error) { }
}

export class GetMetricsAction implements Action {
    readonly type = MonitoringActionTypes.GetMetrics;
    constructor(public stageId: string) {}
}

export class GetMetricsSuccessAction implements Action {
    readonly type = MonitoringActionTypes.GetMetricsSuccess;
    constructor(public payload: MetricSettings[]) {}
}

export class GetMetricsFailAction implements Action {
    readonly type = MonitoringActionTypes.GetMetricsFail;
    constructor(public error) { }
}


export type MonitoringActions
    = GetMetricsAction
    | GetMetricsSuccessAction
    | GetMetricsFailAction
    | AddMetricAction
    | AddMetricSuccessAction
    | AddMetricFailAction
