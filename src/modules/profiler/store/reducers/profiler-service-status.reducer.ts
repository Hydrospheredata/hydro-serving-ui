import { Action, createReducer, on } from '@ngrx/store';
import { ProfilerStatus } from '@profiler/models';
import {
  GetProfilerServiceStatus,
  ProfilerServiceStatusIsAvailable,
  ProfilerServiceStatusIsUnknown,
  ProfilerServiceStatusIsClosedForOSS,
  ProfilerServiceStatusIsFailed,
} from '@profiler/store/actions';

export interface State {
  status: ProfilerStatus;
  error: string;
}

const initialState: State = {
  status: ProfilerStatus.UNKNOWN,
  error: null,
};

const profilerServiceStatus = createReducer(
  initialState,
  on(GetProfilerServiceStatus, state => ({
    ...state,
    status: ProfilerStatus.UNKNOWN,
    error: null,
  })),
  on(ProfilerServiceStatusIsAvailable, state => ({
    ...state,
    status: ProfilerStatus.AVAILABLE,
    error: null,
  })),
  on(ProfilerServiceStatusIsUnknown, state => ({
    ...state,
    status: ProfilerStatus.UNKNOWN,
    errorMessage: null,
  })),
  on(ProfilerServiceStatusIsClosedForOSS, state => ({
    ...state,
    status: ProfilerStatus.CLOSED_FOR_OSS,
    errorMessage: null,
  })),
  on(ProfilerServiceStatusIsFailed, (state, { error }) => ({
    ...state,
    status: ProfilerStatus.FAILED,
    error,
  }))
);

export function reducer(state: State = initialState, action: Action): State {
  return profilerServiceStatus(state, action);
}
