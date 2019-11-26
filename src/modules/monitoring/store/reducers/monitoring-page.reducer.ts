import {
  SetTimeInterval,
  StopAutoUpdate,
  StartAutoUpdate,
  SetDetailedTimeInterval,
  ClearPage,
  SetTimeBound,
} from '@monitoring/store/actions';
import { createReducer, Action, on } from '@ngrx/store';
import { TimeInterval } from '@shared/_index';

export interface State {
  timeInterval: TimeInterval;
  detailedTimeInterval: TimeInterval;
  timeBound: number;
  live: boolean;
}

const initialState: State = {
  timeInterval: undefined,
  detailedTimeInterval: undefined,
  timeBound: 0,
  live: true,
};
const monitoringPageStateReducer = createReducer(
  initialState,
  on(ClearPage, () => initialState),

  on(SetTimeInterval, (state, { timeInterval }) => ({
    ...state,
    timeInterval,
  })),
  on(SetDetailedTimeInterval, (state, { timeInterval }) => ({
    ...state,
    detailedTimeInterval: timeInterval,
    live: false,
  })),
  on(StopAutoUpdate, state => ({ ...state, live: false })),
  on(StartAutoUpdate, state => ({ ...state, live: true })),
  on(SetTimeBound, (state, {timeBound}) => ({...state, timeBound}))
);

export function reducer(state: State, action: Action): State {
  return monitoringPageStateReducer(state, action);
}
