import { Action } from '@ngrx/store';
import { ModelService } from '@shared/models/_index';

export const GET_MODEL_SERVICES = 'GET_MODEL_SERVICES';
export const GET_MODEL_SERVICES_SUCCESS = 'GET_MODEL_SERVICES_SUCCESS';
export const STOP_MODEL_SERVICE = 'STOP_MODEL_SERVICE';
export const DEPLOY_MODEL_SERVICE = 'DEPLOY_MODEL_SERVICE';
export const BUILD_MODEL_SERVICE = 'BUILD_MODEL_SERVICE';
export const TEST_MODEL_SERVICE = 'TEST_MODEL_SERVICE';



export class GetModelServicesAction implements Action {
  readonly type = GET_MODEL_SERVICES;
}
export class GetModelServicesSuccessAction implements Action {
  readonly type = GET_MODEL_SERVICES_SUCCESS;
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
  = GetModelServicesAction
  | GetModelServicesSuccessAction
  | DeployServiceModelsAction
  | StopServiceModelsAction
  | BuildServiceModelsAction
  | TestServiceModelsAction;

