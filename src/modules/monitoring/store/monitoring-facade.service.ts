import { Injectable } from '@angular/core';
import { MonitoringServiceStatus } from '@monitoring/models';
import { GetServiceStatusAction } from '@monitoring/store/actions';
import { State } from '@monitoring/store/reducers';
import {
  getMonitoringServiceStatus,
  getMonitoringServiceError,
} from '@monitoring/store/selectors';
import { Store, select } from '@node_modules/@ngrx/store';
import { Observable } from '@node_modules/rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonitoringFacadeService {
  private serviceStatus$ = this.store.pipe(select(getMonitoringServiceStatus));
  constructor(private store: Store<State>) {}

  getServiceStatus(): Observable<MonitoringServiceStatus> {
    return this.serviceStatus$;
  }

  getMonitoringServiceError(): Observable<any> {
    return this.store.pipe(select(getMonitoringServiceError));
  }

  checkServiceStatus(): void {
    this.store.dispatch(GetServiceStatusAction());
  }
}
