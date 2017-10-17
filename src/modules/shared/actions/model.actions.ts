import { Action } from '@ngrx/store';
import { Model } from '@shared/models/_index';

export const GET_MODELS = 'GET_MODELS';
export const ADD_MODEL = 'ADD_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL';
export const DELETE_MODEL = 'DELETE_MODEL';
export const LOAD_MODELS = 'LOAD_MODELS';
export const SWITCH_MODEL = 'SWITCH_MODEL';
// export const STOP_MODEL = 'STOP_MODEL';
// export const DEPLOY_MODEL = 'DEPLOY_MODEL';
// export const BUILD_MODEL = 'BUILD_MODEL';
// export const TEST_MODEL = 'TEST_MODEL';

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
  constructor(public modelId: string) { }
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

// export class StopModelAction implements Action {
//   readonly type = STOP_MODEL;
//   constructor(public modelId: string) { }
// }
// export class DeployModelAction implements Action {
//   readonly type = DEPLOY_MODEL;
//   constructor(public modelId: string) { }
// }
// export class BuildModelAction implements Action {
//   readonly type = BUILD_MODEL;
//   constructor(public modelId: string) { }
// }
// export class TestModelAction implements Action {
//   readonly type = TEST_MODEL;
//   constructor(public modelId: string) { }
// }


export type ModelActions
  = GetModelsAction
  | AddModelAction
  | UpdateModelAction
  | DeleteModelAction
  | LoadModelsAction
  | SwitchModelAction;
