import { notificationType } from '@app/core/data/types';
import { createAction, props } from '@ngrx/store';

export const Notify = createAction(
  '[Notification] notify',
  props<{ kind: notificationType; message: string }>(),
);

export const NotifyDefault = (message: string) =>
  Notify({ kind: 'default', message });
export const NotifyWarning = (message: string) =>
  Notify({ kind: 'warning', message });
export const NotifySuccess = (message: string) =>
  Notify({ kind: 'success', message });
export const NotifyInfo = (message: string) =>
  Notify({ kind: 'info', message });
export const NotifyError = (message: string) =>
  Notify({ kind: 'error', message });
