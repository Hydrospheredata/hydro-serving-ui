import { Action } from '@ngrx/store';

export enum ProfilerServiceStatusActionTypes {
    GetProfilerServiceStatus = '[Profiler] fetch profiler\'s service status',
    SetProfilerServiceStatusToUnknown = '[Profiler] service\' status is UNKNOWN',
    SetProfilerServiceStatusToAvailable = '[Profiler] profiler\'s service is AVAILABLE',
    SetProfilerServiceStatusToFailed = '[Profiler] profiler\'s service is FAILED',
    SetProfilerServiceStatusToClosedForOSS = '[Profiler] profiler\'s service is CLOSED FOR OSS',
}

export class GetProfilersServiceStatus implements Action {
    readonly type = ProfilerServiceStatusActionTypes.GetProfilerServiceStatus;
}

export class ProfilerServiceStatusIsUnknown implements Action {
    readonly type = ProfilerServiceStatusActionTypes.SetProfilerServiceStatusToUnknown;
}

export class ProfilerServiceStatusIsAvailable implements Action {
    readonly type = ProfilerServiceStatusActionTypes.SetProfilerServiceStatusToAvailable;
}

export class ProfilerServiceStatusIsClosedForOSS implements Action {
    readonly type = ProfilerServiceStatusActionTypes.SetProfilerServiceStatusToClosedForOSS;
}

export class ProfilerServiceStatusIsFailed implements Action {
    readonly type = ProfilerServiceStatusActionTypes.SetProfilerServiceStatusToFailed;
    constructor(public payload: { errorMessage: string }) {}
}

export type ProfilerServiceStatusActions = GetProfilersServiceStatus
    | ProfilerServiceStatusIsAvailable
    | ProfilerServiceStatusIsUnknown
    | ProfilerServiceStatusIsFailed
    | ProfilerServiceStatusIsClosedForOSS;
