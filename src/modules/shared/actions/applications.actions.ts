import { Action } from '@ngrx/store';
import { Application } from '@shared/models/_index';



// GET
export const GET_APPLICATIONS = 'GET_APPLICATIONS';
export const GET_APPLICATIONS_SUCCESS = 'GET_APPLICATIONS_SUCCESS';
export const GET_APPLICATIONS_FAIL = 'GET_APPLICATIONS_FAIL';

export class GetApplicationsAction implements Action {
    readonly type = GET_APPLICATIONS;
}
export class GetApplicationsSuccessAction implements Action {
    readonly type = GET_APPLICATIONS_SUCCESS;
    constructor(public payload: Application[]) { }
}
export class GetApplicationsFailAction implements Action {
    readonly type = GET_APPLICATIONS_FAIL;
}

// ADD
export const ADD_SERVICE = 'ADD_SERVICE';
export const ADD_SERVICE_SUCCESS = 'ADD_SERVICE_SUCCESS';
export const ADD_SERVICE_FAILURE = 'ADD_SERVICE_FAILURE';

export class AddServiceAction implements Action {
    readonly type = ADD_SERVICE;
    constructor(public payload: Application) { }
}
export class AddServiceSuccessAction implements Action {
    readonly type = ADD_SERVICE_SUCCESS;
    constructor(public payload: Application) { }
}
export class AddServiceFailureAction implements Action {
    readonly type = ADD_SERVICE_FAILURE;
    constructor(public error) { }
}


// UPDATE
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const UPDATE_SERVICE_SUCCESS = 'UPDATE_SERVICE_SUCCESS';

export class UpdateServiceAction implements Action {
    readonly type = UPDATE_SERVICE;
    constructor(public payload: Application) { }
}
export class UpdateServiceSuccessAction implements Action {
    readonly type = UPDATE_SERVICE_SUCCESS;
    constructor(public payload: Application) { }
}


// DELETE
export const DELETE_APPLICATION = 'DELETE_APPLICATION';
export const DELETE_APPLICATION_SUCCESS = 'DELETE_APPLICATION_SUCCESS';

export class DeleteApplicationAction implements Action {
    readonly type = DELETE_APPLICATION;
    constructor(public applicationId: number) { }
}
export class DeleteApplicationSuccessAction implements Action {
    readonly type = DELETE_APPLICATION_SUCCESS;
    constructor(public applicationId: number) { }
}

export type ApplicationsActions
    = GetApplicationsAction
    | GetApplicationsSuccessAction
    | GetApplicationsFailAction
    | AddServiceAction
    | AddServiceSuccessAction
    | AddServiceFailureAction
    | UpdateServiceAction
    | UpdateServiceSuccessAction
    | DeleteApplicationAction
    | DeleteApplicationSuccessAction;
