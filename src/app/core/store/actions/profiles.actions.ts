import { createAction, props } from '@ngrx/store';
import { Profiles } from '../../data/types';

export const GetProfiles = createAction(
  '[Profiles] Get profiles',
  props<{ modelVersionId: number; fieldName: string }>()
);

export const GetProfilesSuccess = createAction(
  '[Profiles] Get profiles with success',
  props<{ payload: Profiles }>()
);

export const GetProfilesFail = createAction(
  '[Profiles] Get profiles with fail',
  props<{ error: string }>()
);

export const CleanProfiles = createAction('[Profiles] Clean profiles state');

export const GetFields = createAction(
  '[Profiles] Get fields',
  props<{ modelVersionId: string }>()
);

export const GetFieldsSuccess = createAction(
  '[Profiles] Get fields with success',
  props<{ payload: string[] }>()
);

export const GetFieldsFail = createAction(
  '[Profiles] Get fields with fail',
  props<{ error: string }>()
);
