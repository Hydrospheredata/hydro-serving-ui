import { Action } from '@ngrx/store';
import { Signature } from '@shared/models/_index';

// export const GET_MODEL_CONTRACTS = 'GET_MODEL_CONTRACTS';
// export const GET_MODEL_CONTRACTS_SUCCESS = 'GET_MODEL_CONTRACTS_SUCCESS';
export const GET_MODEL_BUILD_CONTRACTS = 'GET_MODEL_BUILD_CONTRACTS';
export const GET_MODEL_BUILD_CONTRACTS_SUCCESS = 'GET_MODEL_BUILD_CONTRACTS_SUCCESS';



// export class GetModelContractsAction implements Action {
//     readonly type = GET_MODEL_CONTRACTS;
//     constructor(public payload: any) { }
// }
// export class GetModelContractsSuccessAction implements Action {
//     readonly type = GET_MODEL_CONTRACTS_SUCCESS;
//     constructor(public payload: Signature[]) { }
// }

export class GetModelBuildContractsAction implements Action {
    readonly type = GET_MODEL_BUILD_CONTRACTS;
    constructor(public payload: any) { }
}
export class GetModelBuildContractsSuccessAction implements Action {
    readonly type = GET_MODEL_BUILD_CONTRACTS_SUCCESS;
    constructor(public payload: Signature[]) { }
}



export type ContractsActions
    // = GetModelContractsAction
    // | GetModelContractsSuccessAction
    = GetModelBuildContractsAction
    | GetModelBuildContractsSuccessAction;
