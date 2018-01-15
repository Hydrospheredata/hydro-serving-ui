import { Action } from '@ngrx/store';

export const GET_MODEL_RUNTIMES = 'GET_MODEL_RUNTIMES';
export const GET_MODEL_RUNTIMES_SUCCESS = 'GET_MODEL_RUNTIMES_SUCCESS';

// export class GetModelRuntimesAction implements Action {
//   readonly type = GET_MODEL_RUNTIME;
//   constructor(public payload: any) { }
// }

export class GetModelRuntimesAction implements Action {
  readonly type = GET_MODEL_RUNTIMES;
  constructor(public payload: any) { }
}

export class GetModelRuntimesSuccessAction implements Action {
  readonly type = GET_MODEL_RUNTIMES_SUCCESS;
  constructor(public payload: any) { }
}

export type ModelRuntimeActions
  = GetModelRuntimesAction
  | GetModelRuntimesSuccessAction;
