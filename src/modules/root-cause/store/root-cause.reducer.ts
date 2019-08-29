import { createReducer, Action, on, createFeatureSelector } from '@ngrx/store';
import { ExplanationJobStatus } from '@rootcause/interfaces';
import { ExplanationTask } from '@rootcause/models';
import {
  GetStatusesSuccess,
  CreateExplanationTaskSuccess,
  GetResultSuccess,
  JobPending,
  JobStarted,
  JobFinished,
  CreateExplanationTaskFailed,
} from './root-cause.actions';
export interface State {
  [uid: string]: ExplanationTask[];
}

const initialState: State = {};

const rootCauseReducer = createReducer(
  initialState,
  on(GetStatusesSuccess, (state, { uid, tasks }) => ({
    ...state,
    [uid]: tasks,
  })),
  on(CreateExplanationTaskSuccess, (state, { uid, method, taskId }) => {
    if (state[uid] === undefined) {
      return state;
    }

    return {
      ...state,
      [uid]: state[uid].map(task => {
        if (task.method === method) {
          const status = {
            ...task.status,
            task_id: taskId,
            state: ExplanationJobStatus.pending,
          };
          return {
            ...task,
            status,
          };
        } else {
          return task;
        }
      }),
    };
  }),
  on(CreateExplanationTaskFailed, (state, { uid, method, error }) => {
    if (state[uid] === undefined) {
      return state;
    }
    return {
      ...state,
      [uid]: state[uid].map(task => {
        if (task.method === method) {
          return {
            ...task,
            error,
          };
        } else {
          return task;
        }
      }),
    };
  }),
  on(GetResultSuccess, (state, { uid, method, explanation }) => {
    return {
      ...state,
      [uid]: state[uid].map(task => {
        if (task.method === method) {
          return {
            ...task,
            explanation,
          };
        } else {
          return task;
        }
      }),
    };
  }),
  on(JobPending, (state, { uid, method }) => {
    return {
      ...state,
      [uid]: state[uid].map(task => {
        if (task.method === method) {
          const status = {...task.status, state: ExplanationJobStatus.pending };
          return {
            ...task,
            status,
          };
        } else {
          return task;
        }
      }),
    };
  }),
  on(JobFinished, (state, { uid, result, method }) => {
    return {
      ...state,
      [uid]: state[uid].map(task => {
        if (task.method === method) {
          const status = {...task.status, state: ExplanationJobStatus.success, result};
          return {
            ...task,
            status,
          };
        } else {
          return task;
        }
      }),
    };
  }),
  on(JobStarted, (state, { uid, progress, method }) => {
    return {
      ...state,
      [uid]: state[uid].map(task => {
        if (task.method === method) {
          const status = {...task.status, state: ExplanationJobStatus.started, progress };
          return {
            ...task,
            status,
          };
        } else {
          return task;
        }
      }),
    };
  })
);

export function reducer(state: State, action: Action): State {
  return rootCauseReducer(state, action);
}
export const selectRootCauseState = createFeatureSelector('rootCause');
