import { Action } from '@ngrx/store';
import { ModelBuild } from '@shared/models/_index';

export enum ModelBuildsActionTypes {
    GetBuilds = '[Model\' builds] Get all model\'s builds',
    GetBuildsSuccess = '[Model\'s builds] Get all model\'s builds with success',
    GetBuildsFail = '[Model\'s builds] Get all model\'s builds with fail',
}



export class GetModelBuildsAction implements Action {
    readonly type = ModelBuildsActionTypes.GetBuilds;
    constructor(public modelId: number) { }
}

export class GetModelBuildsSuccessAction implements Action {
    readonly type = ModelBuildsActionTypes.GetBuildsSuccess;
    constructor(public payload: ModelBuild[]) { }
}

export class GetModelBuildsFailAction implements Action {
    readonly type = ModelBuildsActionTypes.GetBuildsFail;
    constructor(public error) { }
}



export type ModelBuildsActions
    = GetModelBuildsAction
    | GetModelBuildsSuccessAction
    | GetModelBuildsFailAction;
