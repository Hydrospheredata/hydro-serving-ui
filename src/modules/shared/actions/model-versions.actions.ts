import { Action } from '@ngrx/store';

export const GET_ALL_VERSIONS = 'GET_ALL_VERSIONS';
export const GET_ALL_VERSIONS_SUCCESS = 'GET_ALL_VERSIONS_SUCCESS';



export class GetAllVersionsAction implements Action {
  readonly type = GET_ALL_VERSIONS;
}
export class GetAllVersionsSuccessAction implements Action {
  readonly type = GET_ALL_VERSIONS_SUCCESS;
  constructor(public payload: any) { }
}

export type ModelVersionsActions
  = GetAllVersionsAction
  | GetAllVersionsSuccessAction;