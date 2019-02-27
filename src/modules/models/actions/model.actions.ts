import { Action } from '@ngrx/store';
import { Model } from '@shared/models/_index';

export enum ModelActionTypes {
    Get = '[Model] Get all models',
    GetSuccess = '[Model] Get all models with success',
    GetFail = '[Model] Get all models with fail',
    Delete = '[Model] Delete model',
    DeleteSuccess = '[Model] Delete model with success',
    DeleteFail = '[Model] Delete model with fail',
}

export class GetModelsAction implements Action {
    readonly type = ModelActionTypes.Get;
}

export class GetModelsSuccessAction implements Action {
    readonly type = ModelActionTypes.GetSuccess;
    constructor(public payload: Model[]) { }
}

export class GetModelsFailAction implements Action {
    readonly type = ModelActionTypes.GetFail;
    constructor(public error) { }
}

export class DeleteModelAction implements Action {
    readonly type = ModelActionTypes.Delete;
    constructor(public modelId: number) { }
}

export class DeleteModelSuccessAction implements Action {
    readonly type = ModelActionTypes.DeleteSuccess;
    constructor(public modelId: number) { }
}

export class DeleteModelFailAction implements Action {
    readonly type = ModelActionTypes.DeleteFail;
    constructor(public error) { }
}

export type ModelActions
    = GetModelsAction
    | GetModelsSuccessAction
    | GetModelsFailAction
    | DeleteModelAction
    | DeleteModelSuccessAction
    | DeleteModelFailAction;
