import { Action } from '@ngrx/store';
import { Source } from '@shared/models/_index';

export const GET_SOURCES = 'GET_SOURCES';
export const GET_SOURCES_SUCCESS = 'GET_SOURCES_SUCCESS';

export class GetSourcesAction implements Action {
    readonly type = GET_SOURCES;
}
export class GetSourcesSuccessAction implements Action {
    readonly type = GET_SOURCES_SUCCESS;
    constructor(public payload: Source[]) { }
}

export type SourcesActions
  = GetSourcesAction
  | GetSourcesSuccessAction;
