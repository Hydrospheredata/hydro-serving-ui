import { Action } from '@ngrx/store';
import { Environment } from '@shared/models/_index';



// GET
export const GET_ENVIRONMENTS = 'GET_ENVIRONMENTS';
export const GET_ENVIRONMENTS_SUCCESS = 'GET_ENVIRONMENTS_SUCCESS';

export class GetEnvironmentsAction implements Action {
    readonly type = GET_ENVIRONMENTS;
}
export class GetEnvironmentsSuccessAction implements Action {
    readonly type = GET_ENVIRONMENTS_SUCCESS;
    constructor(public payload: Environment[]) { }
}



export type EnvironmentsActions
  = GetEnvironmentsAction
  | GetEnvironmentsSuccessAction;
