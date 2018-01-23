import { Action } from '@ngrx/store';

export const GET_MODEL_BUILDS = 'GET_MODEL_BUILDS';
export const GET_MODEL_BUILDS_SUCCESS = 'GET_MODEL_BUILDS_SUCCESS';

export class GetModelBuildsAction implements Action {
  readonly type = GET_MODEL_BUILDS;
  constructor(public payload: any) { }
}
export class GetModelBuildsSuccessAction implements Action {
  readonly type = GET_MODEL_BUILDS_SUCCESS;
  constructor(public payload: any) { }
}

export type ModelRuntimeActions
  = GetModelBuildsAction
  | GetModelBuildsSuccessAction;