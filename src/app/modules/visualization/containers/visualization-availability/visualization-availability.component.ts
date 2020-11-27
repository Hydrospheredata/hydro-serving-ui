import { Component, OnInit } from '@angular/core';
import { BuildInformationService } from '@app/core/build-information.service';
import { Observable } from '@node_modules/rxjs';
import { ServiceStatus } from '@app/core/data/types';

@Component({
  selector: 'hs-visualization-availability',
  template: `<hs-service-availability
    *ngIf="status$ | async as status"
    [error]="status.message"
    [name]="'Visualization'"
    [status]="status.status"
  >
    <ng-content></ng-content>
  </hs-service-availability> `,
})
export class VisualizationAvailabilityComponent implements OnInit {
  status$: Observable<{ status: ServiceStatus; message: string }>;

  constructor(private buildInfo: BuildInformationService) {}

  ngOnInit() {
    this.status$ = this.buildInfo.getStatus('visualization');
  }
}
