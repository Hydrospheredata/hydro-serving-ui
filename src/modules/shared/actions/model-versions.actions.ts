import { Action } from '@ngrx/store';

export const GET_ALL_VERSIONS = 'GET_ALL_VERSIONS';
export const GET_ALL_VERSIONS_SUCCESS = 'GET_ALL_VERSIONS_SUCCESS';
export const ADD_VERSION_SUCCESS = 'ADD_VERSION_SUCCESS';



export class GetAllVersionsAction implements Action {
  readonly type = GET_ALL_VERSIONS;
}
export class GetAllVersionsSuccessAction implements Action {
  readonly type = GET_ALL_VERSIONS_SUCCESS;
  constructor(public payload: any) { }
}

export class AddVersionSuccessAction implements Action {
  readonly type = ADD_VERSION_SUCCESS;
  constructor(public payload: any) { }
}

export type ModelVersionsActions
  = GetAllVersionsAction
  | GetAllVersionsSuccessAction
  | AddVersionSuccessAction;