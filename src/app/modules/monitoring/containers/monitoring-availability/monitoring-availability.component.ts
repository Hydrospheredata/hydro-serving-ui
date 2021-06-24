import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  BuildInfo,
  BuildInformationService,
} from '@app/core/build-information.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-availability',
  templateUrl: './monitoring-availability.component.html',
  styleUrls: ['./monitoring-availability.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringAvailabilityComponent implements OnInit {
  status$: Observable<BuildInfo>;

  constructor(private buildInfo: BuildInformationService) {}

  ngOnInit() {
    this.status$ = this.buildInfo.getStatus('sonar');
  }
}
