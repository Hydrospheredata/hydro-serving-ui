import { Action } from '@ngrx/store';
import { Model, ModelVersion } from '@shared/models/_index';

export const GET_MODELS = 'GET_MODELS';
export const ADD_MODEL = 'ADD_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL';
export const DELETE_MODEL = 'DELETE_MODEL';
export const LOAD_MODELS = 'LOAD_MODELS';
export const SWITCH_MODEL = 'SWITCH_MODEL';



export class GetModelsAction implements Action {
  readonly type = GET_MODELS;
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

export class LoadModelsAction implements Action {
  readonly type = LOAD_MODELS;
  constructor(public payload: Model[]) { }
}

export class SwitchModelAction implements Action {
  readonly type = SWITCH_MODEL;
  constructor(public payload: any) { }
}

// GET
export const GET_BUILDS = 'GET_BUILDS';
export const GET_BUILDS_SUCCESS = 'GET_BUILDS_SUCCESS';

export class GetBuildsAction implements Action {
    readonly type = GET_BUILDS;
}
export class GetBuildsSuccessAction implements Action {
    readonly type = GET_BUILDS_SUCCESS;
    constructor(public payload: any[]) { }
}


export type ModelActions
  = GetModelsAction
  | AddModelAction
  | UpdateModelAction
  | DeleteModelAction
  | LoadModelsAction
  | SwitchModelAction
  | GetBuildsAction
  | GetBuildsSuccessAction;
