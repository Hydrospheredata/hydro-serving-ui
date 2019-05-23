import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { GetServiceStatusAction} from '@monitoring/actions';
import { MonitoringServiceStatus } from '@monitoring/models/monitoring-service-status';
import { getMonitoringServiceStatus, getMonitoringServiceError } from '@monitoring/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringPageComponent implements OnInit {
  status$: Observable<MonitoringServiceStatus>;
  error$: Observable<string>;

  constructor(
    private store: Store<HydroServingState>
  ) {

  }

  isAvailable(): string {
    return MonitoringServiceStatus.AVAILABLE;
  }

  isFailed(): string {
    return MonitoringServiceStatus.FAILED;
  }

  isClosedForOSS(): string {
    return MonitoringServiceStatus.CLOSED_FOR_OSS;
  }

  ngOnInit() {
    this.store.dispatch(new GetServiceStatusAction());

    this.status$ = this.store.select(getMonitoringServiceStatus);
    this.error$ = this.store.select(getMonitoringServiceError);
  }
}
