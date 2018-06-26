import { Action } from '@ngrx/store';
import { Runtime } from '@shared/models/_index';

export const GET_RUNTIMES = 'GET_RUNTIMES';
export const GET_RUNTIMES_SUCCESS = 'GET_RUNTIMES_SUCCESS';



export class GetRuntimesAction implements Action {
    readonly type = GET_RUNTIMES;
}
export class GetRuntimesSuccessAction implements Action {
    readonly type = GET_RUNTIMES_SUCCESS;
    constructor(public payload: Runtime[]) { }
}



export type RuntimeActions
  = GetRuntimesAction
  | GetRuntimesSuccessAction;
