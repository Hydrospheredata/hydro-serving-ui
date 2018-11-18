import { Action } from '@ngrx/store';
import { Profiles } from '@shared/models/profiles.model';

export enum ProfilesActionTypes {
  GetProfiles = '[Profiles] Get profiles',
  GetProfilesSuccess = '[Profiles] Get profiles with success',
  GetProfilesFail = '[Profiles] Get profiles with fail',
  CleanProfiles = '[Profiles] Clean profiles state',
  GetFields = '[Profiles] Get fields',
  GetFieldsSuccess = '[Profiles] Get fields with success',
  GetFieldsFail = '[Profiles] Get fields with fail',
}

export class GetProfilesAction implements Action {
  readonly type = ProfilesActionTypes.GetProfiles;
  constructor(public modelVersionId: number, public fieldName: string) {}
}

export class GetProfilesSuccessAction implements Action {
  readonly type = ProfilesActionTypes.GetProfilesSuccess;
  constructor(public payload: Profiles) {}
}

export class GetProfilesFailAction implements Action {
  readonly type = ProfilesActionTypes.GetProfilesFail;
  constructor(public error) {}
}

export class CleanProfilesAction implements Action {
  readonly type = ProfilesActionTypes.CleanProfiles;
}

export class GetFieldsAction implements Action {
  readonly type = ProfilesActionTypes.GetFields;
  constructor(public modelVersionId: number) {}
}

export class GetFieldsSuccessAction implements Action {
  readonly type = ProfilesActionTypes.GetFieldsSuccess;
  constructor(public payload: string[]) {}
}

export class GetFieldsFailAction implements Action {
  readonly type = ProfilesActionTypes.GetFieldsFail;
  constructor(public error) {}
}

export type ProfilesActions
  = GetProfilesAction |
    GetProfilesSuccessAction |
    GetProfilesFailAction |
    CleanProfilesAction |
    GetFieldsAction |
    GetFieldsSuccessAction |
    GetFieldsFailAction;
