import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { GetServiceStatusAction} from '@monitoring/actions';
import { MonitoringServiceStatus } from '@monitoring/models/monitoring-service-status';
import { getMonitoringServiceStatus, getMonitoringServiceError } from '@monitoring/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hs-monitoring-availability',
  templateUrl: './monitoring-availability.component.html',
  styleUrls: ['./monitoring-availability.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringAvailabilityComponent implements OnInit {
  activeTemplate$: Observable<TemplateRef<any>>;
  error$: Observable<string>;

  @ViewChild('loadingTemplate', {read: TemplateRef}) loadingTemplate;
  @ViewChild('errorTemplate', {read: TemplateRef}) errorTemplate;
  @ViewChild('alertTemplate', {read: TemplateRef}) alertTemplate;
  @ViewChild('contentTemplate', {read: TemplateRef}) contentTemplate;

  constructor(
    private store: Store<HydroServingState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new GetServiceStatusAction());
    this.error$ = this.store.select(getMonitoringServiceError);

    this.activeTemplate$ = this.store.select(getMonitoringServiceStatus)
      .pipe(
        map(status => this.statusToTemplate(status))
      );
  }

  private statusToTemplate(status: MonitoringServiceStatus): TemplateRef<any> {
    switch (status) {
      case MonitoringServiceStatus.AVAILABLE:
        return this.contentTemplate;
      case MonitoringServiceStatus.CLOSED_FOR_OSS:
        return this.alertTemplate;
      case MonitoringServiceStatus.FAILED:
        return this.errorTemplate;
      default:
        return this.loadingTemplate;
    }
  }
}
