import { Action } from '@ngrx/store';
import { Model, ModelVersion } from '@shared/models/_index';

export const GET_MODELS = 'GET_MODELS';
export const GET_MODELS_SUCCESS = 'GET_MODELS_SUCCESS';
export const ADD_MODEL = 'ADD_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL';
export const DELETE_MODEL = 'DELETE_MODEL';



export class GetModelsAction implements Action {
    readonly type = GET_MODELS;
}
export class GetModelsSuccessAction implements Action {
    readonly type = GET_MODELS_SUCCESS;
    constructor(public payload: Model[]) { }
}

export class AddModelAction implements Action {
    readonly type = ADD_MODEL;
    constructor(public payload: Model) { }
}

export class UpdateModelAction implements Action {
    readonly type = UPDATE_MODEL;
    constructor(public payload: ModelVersion) { }
}

export class DeleteModelAction implements Action {
    readonly type = DELETE_MODEL;
    constructor(public modelId: string) { }
}



export type ModelActions
    = GetModelsAction
    | GetModelsSuccessAction
    | AddModelAction
    | UpdateModelAction
    | DeleteModelAction;
