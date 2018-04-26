import { Action } from '@ngrx/store';
import { Signature } from '@shared/models/_index';

export enum SignaturesActionTypes {
    GetSignatures = '[Signatures] Get all signatures',
    GetSignaturesSuccess = '[Signatures] Get all signatures with success',
    GetSignaturesFail = '[Signatures] Get all signaturesl with fail',
    GetModelBuildSignatures = '[Signature of model\'s build] Get all signatures for current model\'s build',
    GetModelBuildSignaturesSuccess = '[Signature of model\'s build] Get all signatures for current model\'s build with success',
    GetModelBuildSignaturesFail = '[Signature of model\'s build] Get all signatures for current model\'s build with fail'
}

export class GetSignaturesAction implements Action {
    readonly type = SignaturesActionTypes.GetSignatures;
    constructor(public payload: any) { }
}

export class GetSignaturesSuccessAction implements Action {
    readonly type = SignaturesActionTypes.GetSignaturesSuccess;
    constructor(public signatures: Signature[]) { }
}

export class GetSignaturesFailAction implements Action {
    readonly type = SignaturesActionTypes.GetSignaturesFail;
    constructor(public error) { }
}

export class GetModelBuildSignaturesAction implements Action {
    readonly type = SignaturesActionTypes.GetModelBuildSignatures;
    constructor(public buildId: number) { }
}

export class GetModelBuildSignaturesSuccessAction implements Action {
    readonly type = SignaturesActionTypes.GetModelBuildSignaturesSuccess;
    constructor(public signatures: Signature[]) { }
}

export class GetModelBuildSignaturesFailAction implements Action {
    readonly type = SignaturesActionTypes.GetModelBuildSignaturesFail;
    constructor(public error) { }
}



export type SignaturesActions
    = GetModelBuildSignaturesAction
    | GetModelBuildSignaturesSuccessAction
    | GetModelBuildSignaturesFailAction
    | GetSignaturesAction
    | GetSignaturesSuccessAction
    | GetSignaturesFailAction;
