import { Action } from '@ngrx/store';
import { Application } from '@shared/models/_index';

export enum ApplicationActionTypes {
    Get = '[Application] Get all applications',
    GetSuccess = '[Application] Get all applications with success',
    GetFail = '[Application] Get all applications with fail',
    Add = '[Application] Add new application',
    AddSuccess = '[Application] Add new application with success',
    AddFail = '[Application] Add new application with fail',
    Update = '[Application] Update application',
    UpdateSuccess = '[Application] Update application with success',
    UpdateFail = '[Application] Update application with fail',
    Delete = '[Application] Delete application',
    DeleteSuccess = '[Application] Delete application with success',
    DeleteFail = '[Application] Delete application with fail'
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

export class AddApplicationAction implements Action {
    readonly type = ApplicationActionTypes.Add;
    constructor(public payload: Application) { }
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
    constructor(public payload: Application) { }
}

export class UpdateApplicationSuccessAction implements Action {
    readonly type = ApplicationActionTypes.UpdateSuccess;
    constructor(public payload: Application) { }
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

export type ApplicationActions
    = GetApplicationsAction
    | GetApplicationsSuccessAction
    | GetApplicationsFailAction
    | AddApplicationAction
    | AddApplicationSuccessAction
    | AddApplicationFailAction
    | UpdateApplicationAction
    | UpdateApplicationSuccessAction
    | DeleteApplicationAction
    | DeleteApplicationSuccessAction
    | DeleteApplicationFailAction;
