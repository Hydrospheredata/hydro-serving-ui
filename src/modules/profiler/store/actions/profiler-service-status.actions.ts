import { createAction, props } from '@ngrx/store';

export const GetProfilerServiceStatus = createAction(
  '[Profiler] fetch profiler\'s service status'
);

export const ProfilerServiceStatusIsUnknown = createAction(
  '[Profiler] service\' status is UNKNOWN'
);

export const ProfilerServiceStatusIsAvailable = createAction(
  '[Profiler] profiler\'s service is AVAILABLE'
);

export const ProfilerServiceStatusIsClosedForOSS = createAction(
   '[Profiler] profiler\'s service is CLOSED FOR OSS'
);

export const ProfilerServiceStatusIsFailed = createAction(
    '[Profiler] profiler\'s service is FAILED',
    props<{error: string}>()
);
