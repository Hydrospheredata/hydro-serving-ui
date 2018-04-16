import { Action } from '@ngrx/store';
import { Model, ModelVersion } from '@shared/models/_index';

export enum ModelActionTypes {
    Get = '[Model] Get all models',
    GetSuccess = '[Model] Get all models with success',
    GetFail = '[Model] Get all models with fail',
    Update = '[Model] Update model',
    UpdateSuccess = '[Model] Update model with success',
    UpdateFail = '[Model] Update model with fail',
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

export class UpdateModelAction implements Action {
    readonly type = ModelActionTypes.UpdateSuccess;
    constructor(public payload: ModelVersion) { }
}




export type ModelActions
    = GetModelsAction
    | GetModelsSuccessAction
    | GetModelsFailAction
    | UpdateModelAction;
