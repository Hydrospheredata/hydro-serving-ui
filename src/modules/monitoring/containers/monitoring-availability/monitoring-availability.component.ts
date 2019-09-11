import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MonitoringServiceStatus } from '@monitoring/models/monitoring-service-status';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import {
  getMonitoringServiceStatus,
  getMonitoringServiceError,
} from '@monitoring/store/selectors';
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
  error$ = this.facade.serviceStatusError$;

  @ViewChild('loadingTemplate', { read: TemplateRef }) loadingTemplate;
  @ViewChild('errorTemplate', { read: TemplateRef }) errorTemplate;
  @ViewChild('alertTemplate', { read: TemplateRef }) alertTemplate;
  @ViewChild('contentTemplate', { read: TemplateRef }) contentTemplate;

  constructor(private facade: MonitoringPageFacade) {}

  ngOnInit() {
    this.activeTemplate$ = this.facade.serviceStatus$
      .pipe(map(status => this.statusToTemplate(status)));

    this.facade.getServiceStatus();
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
