import { Action } from '@ngrx/store';
import { Model } from '@shared/models/_index';

export const GET_MODEL = 'GET_MODEL';

export class GetModelsAction implements Action {
  readonly type = GET_MODEL;
  constructor(public payload: Model[]) { }
}

export type ModelActions
  = GetModelsAction;
