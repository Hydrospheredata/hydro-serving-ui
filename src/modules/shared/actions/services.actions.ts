import { Action } from '@ngrx/store';
import { Service } from '@shared/models/_index';



// GET
export const GET_SERVICES = 'GET_SERVICES';
export const GET_SERVICES_SUCCESS = 'GET_SERVICES_SUCCESS';

export class GetServicesAction implements Action {
    readonly type = GET_SERVICES;
}
export class GetServicesSuccessAction implements Action {
    readonly type = GET_SERVICES_SUCCESS;
    constructor(public payload: Service[]) { }
}

// ADD
export const ADD_SERVICE = 'ADD_SERVICE';
export const ADD_SERVICE_SUCCESS = 'ADD_SERVICE_SUCCESS';

export class AddServiceAction implements Action {
    readonly type = ADD_SERVICE;
    constructor(public payload: Service) { }
}
export class AddServiceSuccessAction implements Action {
    readonly type = ADD_SERVICE_SUCCESS;
    constructor(public payload: Service) { }
}


// UPDATE
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const UPDATE_SERVICE_SUCCESS = 'UPDATE_SERVICE_SUCCESS';

export class UpdateServiceAction implements Action {
    readonly type = UPDATE_SERVICE;
    constructor(public payload: Service) { }
}
export class UpdateServiceSuccessAction implements Action {
    readonly type = UPDATE_SERVICE_SUCCESS;
    constructor(public payload: Service) { }
}


// DELETE
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';

export class DeleteServiceAction implements Action {
    readonly type = DELETE_SERVICE;
    constructor(public applicationId: number) { }
}
export class DeleteServiceSuccessAction implements Action {
    readonly type = DELETE_SERVICE_SUCCESS;
    constructor(public applicationId: number) { }
}

export type ServicesActions
  = GetServicesAction
  | GetServicesSuccessAction
  | AddServiceAction
  | AddServiceSuccessAction
  | UpdateServiceAction
  | UpdateServiceSuccessAction
  | DeleteServiceAction
  | DeleteServiceSuccessAction;
