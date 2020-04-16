import { createAction, props } from '@ngrx/store';
import { Servable } from '../models';

export const getAll = createAction('[Servables] get all');
export const getAllSuccess = createAction(
  '[Servables] get all success',
  props<{ servables: Servable[] }>()
);
export const getAllFailed = createAction(
  '[Servables] get all failed',
  props<{ error: string }>()
);
export const updateServable = createAction(
  '[Servables] update servable',
  props<{ servable: Servable }>()
);

export const deleteServable = createAction(
  '[Servable] delete',
  props<{ name: string }>()
);
export const deleteServableSuccess = createAction(
  '[Servable] delete success',
  props<{ name: string }>()
);
export const deleteServableFailed = createAction(
  '[Servable] delete failed',
  props<{ error: string }>()
);

export const getServable = createAction(
  '[Servable] get servable',
  props<{ name: string }>()
);
export const getServableSuccess = createAction(
  '[Servable] get servable success',
  props<{ servable: Servable }>()
);
export const getServableFailed = createAction(
  '[Servable] get servable failed',
  props<{ error: string }>()
);
export const getLogs = createAction('[Servable] get servable logs');
export const createLogStream = createAction(
  '[Servable] create log stream',
  props<{ name: string }>()
);
