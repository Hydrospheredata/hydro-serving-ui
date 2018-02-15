import { Action } from '@ngrx/store';
import { Signature } from '@shared/models/_index';

export const GET_CONTRACTS = 'GET_CONTRACTS';
export const GET_CONTRACTS_SUCCESS = 'GET_CONTRACTS_SUCCESS';



export class GetContractsAction implements Action {
    readonly type = GET_CONTRACTS;
    constructor(public payload: any) { }
}
export class GetContractsSuccessAction implements Action {
    readonly type = GET_CONTRACTS_SUCCESS;
    constructor(public payload: Signature[]) { }
}



export type ContractsActions
  = GetContractsAction
  | GetContractsSuccessAction;
