import {
    ProfilerServiceStatusActions,
    ProfilerServiceStatusActionTypes as ActionTypes
} from '@profiler/actions';
import { ProfilerStatus } from '@profiler/models';

export interface State {
    status: ProfilerStatus;
    errorMessage: string;
}

export const initialState: State = {
    status: ProfilerStatus.UNKNOWN,
    errorMessage: null,
};

export function reducer(
    state: State = initialState,
    action: ProfilerServiceStatusActions
) {
    switch (action.type) {
        case ActionTypes.GetProfilerServiceStatus: {
            return {
                ...state,
                status: ProfilerStatus.UNKNOWN,
                errorMessage: null,
            };
        }
        case ActionTypes.SetProfilerServiceStatusToAvailable: {
            return {
                ...state,
                status: ProfilerStatus.AVAILABLE,
                errorMessage: null,
            };
        }
        case ActionTypes.SetProfilerServiceStatusToUnknown: {
            return {
                ...state,
                status: ProfilerStatus.UNKNOWN,
                errorMessage: null,
            };
        }
        case ActionTypes.SetProfilerServiceStatusToClosedForOSS: {
            return {
                ...state,
                status: ProfilerStatus.CLOSED_FOR_OSS,
                errorMessage: null,
            };
        }
        case ActionTypes.SetProfilerServiceStatusToFailed: {
            return {
                ...state,
                status: ProfilerStatus.FAILED,
                errorMessage: action.errorMessage,
            };
        }
        default: {
            return state;
        }
    }
}
