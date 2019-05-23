import { ActionReducerMap } from '@ngrx/store';
import * as fromMonitoringServiceStatus from './monitoring-service-status.reducer';

export interface State {
    monitoringServiceStatus: fromMonitoringServiceStatus.State;
}

export const reducer: ActionReducerMap<State> = {
    monitoringServiceStatus: fromMonitoringServiceStatus.reducer,
};
