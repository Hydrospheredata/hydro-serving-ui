// tslint:disable:max-line-length

import { Action } from '@ngrx/store';
import { Signature } from '@shared/models/_index';

export enum SignaturesActionTypes {
    GetModelVersionSignatures = '[Signature of model\'s version] Get all signatures for current model\'s version',
    GetModelVersionSignaturesSuccess = '[Signature of model\'s version] Get all signatures for current model\'s version with success',
    GetModelVersionSignaturesFail = '[Signature of model\'s version] Get all signatures for current model\'s version with fail',
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
    | GetModelVersionSignaturesFailAction;
