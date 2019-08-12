import { MonitoringServiceStatus } from '@monitoring/models';
import {
  MonitoringServiceStatusActionTypes,
  MonitoringServiceStatusAction,
} from '@monitoring/store/actions';

export interface State {
  status: MonitoringServiceStatus;
  error: string;
}

const initialState: State = {
  status: MonitoringServiceStatus.AVAILABLE,
  error: null,
};

export function reducer(
  state: State = initialState,
  action: MonitoringServiceStatusAction
): State {
  switch (action.type) {
    case MonitoringServiceStatusActionTypes.GetServiceStatus: {
      return {
        ...state,
        status: MonitoringServiceStatus.UNKNOWN,
        error: null,
      };
    }
    case MonitoringServiceStatusActionTypes.SetStatusToFailed: {
      return {
        ...state,
        status: MonitoringServiceStatus.FAILED,
        error: action.payload.errorMessage,
      };
    }
    case MonitoringServiceStatusActionTypes.SetStatusToAvailable: {
      return {
        ...state,
        status: MonitoringServiceStatus.AVAILABLE,
        error: null,
      };
    }
    case MonitoringServiceStatusActionTypes.SetStatusToClosedForOSS: {
      return {
        ...state,
        status: MonitoringServiceStatus.CLOSED_FOR_OSS,
        error: null,
      };
    }
    default:
      return state;
  }
}
