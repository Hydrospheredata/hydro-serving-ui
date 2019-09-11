import { createAction, props } from '@ngrx/store';
import { Model } from '@shared/_index';

export const GetModels = createAction('[Model] get all model');
export const GetModelsSuccess = createAction(
  '[Model] get all model with success',
  props<{ payload: Model[] }>()
);
export const GetModelsFail = createAction(
  '[Model] get all models with fail',
  props<{ error: string }>()
);
export const DeleteModel = createAction(
  '[Model] delete',
  props<{ modelId: number }>()
);
export const DeleteModelSuccess = createAction(
  '[Model] delete with success',
  props<{ modelId: number }>()
);
export const DeleteModelFail = createAction(
  '[Model] delete with fail',
  props<{ error: string }>()
);