import { createAction, props } from '@ngrx/store';
import { ModelVersion } from '../../data/types';

export const GetModelVersions = createAction('[Model Version]');
export const GetModelVersionsSuccess = createAction(
  '[Model Version] with success',
  props<{ payload: ModelVersion[] }>(),
);
export const GetModelVersionsFail = createAction(
  '[Model Version] with fail',
  props<{ error: string }>(),
);
export const AddModelVersion = createAction(
  '[Model Version] add model version',
  props<{ modelVersion: ModelVersion }>(),
);
export const AddModelVersionSuccess = createAction(
  '[Model Version] added with success',
  props<{ modelVersion: ModelVersion }>(),
);
export const UpsertModelVersion = createAction(
  '[Model Version] upsert',
  props<{ modelVersion: ModelVersion }>(),
);
export const DeleteModelVersionSuccess = createAction(
  '[Model Version] deleted with success',
  props<{ modelVersionId: number }>(),
);
