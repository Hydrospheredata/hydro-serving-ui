import { ActionReducerMap } from '@ngrx/store';
import * as fromMonitoringPage from './monitoring-page.reducer';
import * as fromMonitoringServiceStatus from './monitoring-service-status.reducer';

export interface State {
  monitoringServiceStatus: fromMonitoringServiceStatus.State;
  monitoringPage: fromMonitoringPage.State;
}

export const reducer: ActionReducerMap<State> = {
  monitoringServiceStatus: fromMonitoringServiceStatus.reducer,
  monitoringPage: fromMonitoringPage.reducer,
};
