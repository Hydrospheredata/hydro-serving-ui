import { Action } from '@ngrx/store';

export enum MonitoringServiceStatusActionTypes {
    GetServiceStatus =      '[Monitoring service] get status',
    SetStatusToAvailable =  '[Monitoring service] is available',
    SetStatusToFailed =     '[Monitoring service] is failed',
    SetStatusToUnknown =    '[Monitoring service] is unknown',
    SetStatusToClosedForOSS = '[Monitoring service] is close for OSS',
}

export class GetServiceStatusAction implements Action {
    readonly type = MonitoringServiceStatusActionTypes.GetServiceStatus;
}

export class SetStatusToAvailableAction implements Action {
    readonly type = MonitoringServiceStatusActionTypes.SetStatusToAvailable;
}

export class SetStatusToFailedAction implements Action {
    readonly type = MonitoringServiceStatusActionTypes.SetStatusToFailed;
    constructor(public payload: { errorMessage: string}) {}
}

export class SetStatusToClosedForOSSAction implements Action {
    readonly type = MonitoringServiceStatusActionTypes.SetStatusToClosedForOSS;
}

export type MonitoringServiceStatusAction = SetStatusToFailedAction |
 SetStatusToClosedForOSSAction |
 GetServiceStatusAction |
 SetStatusToAvailableAction;
