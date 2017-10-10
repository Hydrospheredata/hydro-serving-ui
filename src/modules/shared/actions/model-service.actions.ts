import { Action } from '@ngrx/store';
import { ModelService } from '@shared/models/_index';

export const GET_MODEL_SERVICE = 'GET_MODEL_SERVICE';

export class GetServiceModelsAction implements Action {
  readonly type = GET_MODEL_SERVICE;
  constructor(public payload: ModelService[]) { }
}

export type ModelServiceActions
  = GetServiceModelsAction;
