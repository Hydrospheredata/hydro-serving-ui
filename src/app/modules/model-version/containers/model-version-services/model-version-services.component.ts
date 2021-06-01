import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import {
  ModelVersion,
  ModelVersionServiceStatusesEntity,
} from '@app/core/data/types';
import { ServiceStatusesFacade } from '@app/core/facades/service-statuses.facade';

@Component({
  selector: 'hs-model-version-services',
  templateUrl: './model-version-services.component.html',
  styleUrls: ['./model-version-services.component.scss'],
})
export class ModelVersionServicesComponent implements OnInit {
  @Input() modelVersion: ModelVersion;

  serviceStatuses$: Observable<ModelVersionServiceStatusesEntity>;

  constructor(private readonly serviceFacade: ServiceStatusesFacade) {}

  serviceStatusesById$(
    id: number
  ): Observable<ModelVersionServiceStatusesEntity> {
    return this.serviceFacade.selectServiceStatusesById(id);
  }

  ngOnInit() {
    this.serviceFacade.loadAll(this.modelVersion);
    this.serviceStatuses$ = this.serviceStatusesById$(this.modelVersion.id);
  }
}
