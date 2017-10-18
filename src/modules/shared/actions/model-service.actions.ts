import { Action } from '@ngrx/store';
import { ModelService } from '@shared/models/_index';

export const GET_MODEL_SERVICE = 'GET_MODEL_SERVICE';
export const STOP_MODEL_SERVICE = 'STOP_MODEL_SERVICE';
export const DEPLOY_MODEL_SERVICE = 'DEPLOY_MODEL_SERVICE';
export const BUILD_MODEL_SERVICE = 'BUILD_MODEL_SERVICE';
export const TEST_MODEL_SERVICE = 'TEST_MODEL_SERVICE';

export class GetServiceModelsAction implements Action {
  readonly type = GET_MODEL_SERVICE;
  constructor(public payload: ModelService[]) { }
}
// TODO: PROPER TYPING
export class DeployServiceModelsAction implements Action {
  readonly type = DEPLOY_MODEL_SERVICE;
  constructor(public payload: any) { }
}

export class StopServiceModelsAction implements Action {
  readonly type = STOP_MODEL_SERVICE;
  constructor(public payload: any) { }
}

export class BuildServiceModelsAction implements Action {
  readonly type = BUILD_MODEL_SERVICE;
  constructor(public payload: any) { }
}

export class TestServiceModelsAction implements Action {
  readonly type = TEST_MODEL_SERVICE;
  constructor(public payload: any) { }
}

export type ModelServiceActions
  = GetServiceModelsAction
  | DeployServiceModelsAction
  | StopServiceModelsAction
  | BuildServiceModelsAction
  | TestServiceModelsAction;

