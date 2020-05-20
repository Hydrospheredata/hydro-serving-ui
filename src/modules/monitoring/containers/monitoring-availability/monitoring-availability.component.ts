import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BuildInformationService } from '@core/services/build-information.service';
import { ServiceStatus } from '@shared/models/service-status.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-availability',
  templateUrl: './monitoring-availability.component.html',
  styleUrls: ['./monitoring-availability.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringAvailabilityComponent implements OnInit {
  status$: Observable<{ status: ServiceStatus; message: string }>;

  constructor(private buildInfo: BuildInformationService) {}

  ngOnInit() {
    this.status$ = this.buildInfo.getStatus('sonar');
  }
}
