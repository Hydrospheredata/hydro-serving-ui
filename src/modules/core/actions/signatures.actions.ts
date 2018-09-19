import { Action } from '@ngrx/store';
import { Signature } from '@shared/models/_index';

export enum SignaturesActionTypes {
    GetSignatures = '[Signatures] Get all signatures',
    GetSignaturesSuccess = '[Signatures] Get all signatures with success',
    GetSignaturesFail = '[Signatures] Get all signaturesl with fail',
    GetModelVersionSignatures = '[Signature of model\'s version] Get all signatures for current model\'s version',
    GetModelVersionSignaturesSuccess = '[Signature of model\'s version] Get all signatures for current model\'s version with success',
    GetModelVersionSignaturesFail = '[Signature of model\'s version] Get all signatures for current model\'s version with fail'
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

export class GetModelVersionSignaturesAction implements Action {
    readonly type = SignaturesActionTypes.GetModelVersionSignatures;
    constructor(public modelVersionId: number) { }
}

export class GetModelVersionSignaturesSuccessAction implements Action {
    readonly type = SignaturesActionTypes.GetModelVersionSignaturesSuccess;
    constructor(public signatures: Signature[]) { }
}

export class GetModelVersionSignaturesFailAction implements Action {
    readonly type = SignaturesActionTypes.GetModelVersionSignaturesFail;
    constructor(public error) { }
}


export type SignaturesActions
    = GetModelVersionSignaturesAction
    | GetModelVersionSignaturesSuccessAction
    | GetModelVersionSignaturesFailAction
    | GetSignaturesAction
    | GetSignaturesSuccessAction
    | GetSignaturesFailAction;
