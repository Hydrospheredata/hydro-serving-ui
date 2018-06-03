import { MetricSettings } from './../../shared/models/metric-settings.model';
import { Action } from '@ngrx/store';
import { Application } from '@shared/models/_index';

export enum ApplicationActionTypes {
    Get = '[Application] Get all applications',
    GetSuccess = '[Application] Get all applications with success',
    GetFail = '[Application] Get all applications with fail',
    GetById = '[Application] Get application by id',
    GetByIdSuccess = '[Application] Get application by id with success',
    GetByIdFail = '[Application] Get application by id with fail',
    Add = '[Application] Add new application',
    AddSuccess = '[Application] Add new application with success',
    AddFail = '[Application] Add new application with fail',
    Update = '[Application] Update application',
    UpdateSuccess = '[Application] Update application with success',
    UpdateFail = '[Application] Update application with fail',
    Delete = '[Application] Delete application',
    DeleteSuccess = '[Application] Delete application with success',
    DeleteFail = '[Application] Delete application with fail',
    SetInput = '[Test application] Set inputs for application test',
    SetInputSuccess = '[Test application] Set inputs for application test with success',
    GenerateInput = '[Test application] Generate inputs for application test',
    GenerateInputSuccess = '[Test application] Generate inputs for application test with success',
    GenerateInputFail = '[Test application] Generate inputs for application test with fail',
    Test = '[Test application] Test application',
    TestSuccess = '[Test application] Test application with success',
    TestFail = '[Test application] Test application with fail',
    AddMetric = '[Metrics] Add metric',
    AddMetricSuccess = '[Metrics] Add metric with success',
    AddMetricFail = '[Metrics] Add metric with fail',
}

export class GetApplicationsAction implements Action {
    readonly type = ApplicationActionTypes.Get;
}

export class GetApplicationsSuccessAction implements Action {
    readonly type = ApplicationActionTypes.GetSuccess;
    constructor(public payload: Application[]) { }
}

export class GetApplicationsFailAction implements Action {
    readonly type = ApplicationActionTypes.GetFail;
    constructor(public error) { }
}

export class GetApplicationByIdAction implements Action {
    readonly type = ApplicationActionTypes.GetById;
}

export class GetApplicationByIdSuccessAction implements Action {
    readonly type = ApplicationActionTypes.GetByIdSuccess;
    constructor(public payload: Application) { }
}

export class GetApplicationByIdFailAction implements Action {
    readonly type = ApplicationActionTypes.GetByIdFail;
    constructor(public error) { }
}

export class AddApplicationAction implements Action {
    readonly type = ApplicationActionTypes.Add;
    constructor(public application: Application) { }
}
export class AddApplicationSuccessAction implements Action {
    readonly type = ApplicationActionTypes.AddSuccess;
    constructor(public payload: Application) { }
}
export class AddApplicationFailAction implements Action {
    readonly type = ApplicationActionTypes.AddFail;
    constructor(public error) { }
}

export class UpdateApplicationAction implements Action {
    readonly type = ApplicationActionTypes.Update;
    constructor(public application: Application) { }
}

export class UpdateApplicationSuccessAction implements Action {
    readonly type = ApplicationActionTypes.UpdateSuccess;
    constructor(public payload: Application) { }
}

export class UpdateApplicationFailAction implements Action {
    readonly type = ApplicationActionTypes.UpdateFail;
    constructor(public error) { }
}

export class DeleteApplicationAction implements Action {
    readonly type = ApplicationActionTypes.Delete;
    constructor(public applicationId: number) { }
}

export class DeleteApplicationSuccessAction implements Action {
    readonly type = ApplicationActionTypes.DeleteSuccess;
    constructor(public applicationId: number) { }
}

export class DeleteApplicationFailAction implements Action {
    readonly type = ApplicationActionTypes.DeleteFail;
    constructor(public error) { }
}

export class GenerateInputAction implements Action {
    readonly type = ApplicationActionTypes.GenerateInput;
}

export class SetInputAction implements Action {
    readonly type = ApplicationActionTypes.SetInput;
    constructor(public payload) { };
}

export class SetInputSuccessAction implements Action {
    readonly type = ApplicationActionTypes.SetInputSuccess;
    constructor(public payload) { };
}

export class GenerateInputSuccessAction implements Action {
    readonly type = ApplicationActionTypes.GenerateInputSuccess;
    constructor(public payload) { };
}

export class GenerateInputFailAction implements Action {
    readonly type = ApplicationActionTypes.GenerateInputFail;
    constructor(public error) { };
}

export class TestApplicationAction implements Action {
    readonly type = ApplicationActionTypes.Test;
}

export class TestApplicationSuccessAction implements Action {
    readonly type = ApplicationActionTypes.TestSuccess;
    constructor(public payload) { };
}

export class TestApplicationFailAction implements Action {
    readonly type = ApplicationActionTypes.TestFail;
    constructor(public error) { };
}

export class AddMetricAction implements Action {
    readonly type = ApplicationActionTypes.AddMetric;
    constructor(public aggregation: MetricSettings) { }
}

export class AddMetricSuccessAction implements Action {
    readonly type = ApplicationActionTypes.AddMetricSuccess;
    constructor(public payload: MetricSettings) { }
}

export class AddMetricFailAction implements Action {
    readonly type = ApplicationActionTypes.AddMetricFail;
    constructor(public error) { }
}


export type ApplicationActions
    = GetApplicationsAction
    | GetApplicationsSuccessAction
    | GetApplicationsFailAction
    | AddApplicationAction
    | AddApplicationSuccessAction
    | AddApplicationFailAction
    | UpdateApplicationAction
    | UpdateApplicationSuccessAction
    | UpdateApplicationFailAction
    | DeleteApplicationAction
    | DeleteApplicationSuccessAction
    | DeleteApplicationFailAction
    | SetInputAction
    | SetInputSuccessAction
    | GenerateInputAction
    | GenerateInputSuccessAction
    | GenerateInputFailAction
    | TestApplicationAction
    | TestApplicationSuccessAction
    | TestApplicationFailAction
    | AddMetricAction
    | AddMetricSuccessAction
    | AddMetricFailAction;
