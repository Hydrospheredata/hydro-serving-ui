import { Action } from '@ngrx/store';
import { MonitoringDictionary } from '@shared/models/monitoring-dictionary.model';

export enum MonitoringActionTypes {
    GetDictionary = '[Monitoring] GetDictionary',
    GetDictionarySuccess = '[Monitoring] GetDictionarySuccess',
    GetDictionaryFail = '[Monitoring] GetDictionaryFail',
};

export class GetDictionary implements Action {
    readonly type = MonitoringActionTypes.GetDictionary;
}

export class GetDictionarySuccess implements Action {
    readonly type = MonitoringActionTypes.GetDictionarySuccess;

    constructor(public dictionary: MonitoringDictionary[]) { }
}

export class GetDictionaryFail implements Action {
    readonly type = MonitoringActionTypes.GetDictionaryFail;

    constructor(public error) { }
}

export type MonitoringActions
    = GetDictionary
    | GetDictionarySuccess
    | GetDictionaryFail;
