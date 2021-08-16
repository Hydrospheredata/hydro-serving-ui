import { createAction, props } from '@ngrx/store';
import { Application, ApplicationUpdateRequest } from '../../data/types';

export const Get = createAction('[Application] Get all applications');
export const GetSuccess = createAction(
  '[Application] Get all applications with success',
  props<{ payload: Application[] }>(),
);
export const GetFail = createAction(
  '[Application] Get all applications with fail',
  props<{ error: string }>(),
);

export const GetById = createAction(
  '[Application] Get application by id',
  props<{ application: Application }>(),
);
export const GetByIdSuccess = createAction(
  '[Application] Get application by id with success',
  props<{ payload: Application }>(),
);
export const GetByIdFail = createAction(
  '[Application] Get application by id with fail',
  props<{ error: string }>(),
);

export const Add = createAction(
  '[Application] add application',
  props<{ application: Application }>(),
);
export const AddSuccess = createAction(
  '[Application] add application with success',
  props<{ payload: Application }>(),
);
export const AddFail = createAction(
  '[Application] add application with fail',
  props<{ error: string }>(),
);

export const Update = createAction(
  '[Application] update application',
  props<{ application: ApplicationUpdateRequest }>(),
);
export const UpdateSuccess = createAction(
  '[Application] update application with success',
  props<{ payload: Application }>(),
);
export const UpdateFail = createAction(
  '[Application] update application with fail',
  props<{ error: string }>(),
);

export const SseUpdateEvent = createAction(
  '[SSE Application] update application sse event',
  props<{ application: Application }>(),
);

export const Delete = createAction(
  '[Application] delete application',
  props<{ application: Application }>(),
);

export const SseDeleteEvent = createAction(
  '[SSE Application] delete application sse event',
  props<{ applicationName: string }>(),
);

export const DeleteSuccess = createAction(
  '[Application] delete application with success',
  props<{ applicationName: string }>(),
);

export const DeleteFail = createAction(
  '[Application] delete application with fail',
  props<{ error: string }>(),
);

export const GenerateInput = createAction('[Application] generate input');
export const GenerateInputSuccess = createAction(
  '[Application] generate input with success',
  props<{ payload: { name: string; input: any } }>(),
);
export const GenerateInputFail = createAction(
  '[Application] generate input with fail',
  props<{ error: string }>(),
);

export const SetInput = createAction(
  '[Application] set input',
  props<{ payload: any }>(),
);
export const SetInputSuccess = createAction(
  '[Application] set input with success',
  props<{ payload: { name: string; input: any } }>(),
);

export const Test = createAction(
  '[Application] test',
  props<{ payload: Application }>(),
);
export const TestSuccess = createAction(
  '[Application] test with success',
  props<{ payload: { name: string; output: any } }>(),
);
export const TestFail = createAction(
  '[Application] test with fail',
  props<{ payload: { name: string; error: string } }>(),
);
export const ToggleFavorite = createAction(
  '[Application] toggleFavorite',
  props<{ payload: { application: Application } }>(),
);
export const ClearTestingDialog = createAction('[Testing window] clear');
