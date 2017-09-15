import { Action } from '@ngrx/store';
import { Service } from '@shared/models/_index';

export const GET_SERVICES = 'GET_SERVICES';
export const ADD_SERVICE = 'ADD_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';

export class GetServicesAction implements Action {
  readonly type = GET_SERVICES;
  constructor(public payload: Service[]) { }
}

export class AddServiceAction implements Action {
  readonly type = ADD_SERVICE;
  constructor(public payload: Service) { }
}

export class UpdateServiceAction implements Action {
  readonly type = UPDATE_SERVICE;
  constructor(public serviceId: string) { }
}

export class DeleteServiceAction implements Action {
  readonly type = DELETE_SERVICE;
  constructor(public serviceId: string) { }
}

export type ServicesActions
  = GetServicesAction
  | AddServiceAction
  | UpdateServiceAction
  | DeleteServiceAction;
