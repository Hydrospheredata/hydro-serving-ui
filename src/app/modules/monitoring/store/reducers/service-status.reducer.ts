import { MonitoringServiceStatus } from '../../models';

import {
  GetServiceStatusAction,
  SetStatusToFailedAction,
  SetStatusToAvailableAction,
  SetStatusToClosedForOSSAction,
} from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  status: MonitoringServiceStatus;
  error: string;
}

const initialState: State = {
  status: MonitoringServiceStatus.UNKNOWN,
  error: null,
};

const monitoringStatusReducer = createReducer(
  initialState,
  on(GetServiceStatusAction, state => ({
    ...state,
    error: null,
    status: MonitoringServiceStatus.UNKNOWN,
  })),
  on(SetStatusToFailedAction, (state, action) => ({
    ...state,
    status: MonitoringServiceStatus.FAILED,
    error: action.error,
  })),
  on(SetStatusToAvailableAction, state => ({
    ...state,
    status: MonitoringServiceStatus.AVAILABLE,
  })),
  on(SetStatusToClosedForOSSAction, state => ({
    ...state,
    status: MonitoringServiceStatus.CLOSED_FOR_OSS,
  }))
);

export function reducer(state: State, action: Action): State {
  return monitoringStatusReducer(state, action);
}
