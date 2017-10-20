import { Action } from '@ngrx/store';
import { ModelRuntime } from '@shared/models/_index';

export const GET_MODEL_RUNTIME = 'GET_MODEL_RUNTIME';

export class GetModelRuntimesAction implements Action {
  readonly type = GET_MODEL_RUNTIME;
  constructor(public payload: any) { }
}

export type ModelRuntimeActions
  = GetModelRuntimesAction;
