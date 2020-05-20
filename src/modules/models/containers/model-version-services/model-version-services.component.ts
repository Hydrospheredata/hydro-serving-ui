import { Component, OnInit, Input } from '@angular/core';
import {
  ServicesSupportService,
  ServiceSupported,
} from '@models/services/services-support.service';
import { Observable } from '@node_modules/rxjs';
import { ModelVersion } from '@shared/models';

@Component({
  selector: 'hs-model-version-services',
  templateUrl: './model-version-services.component.html',
  styleUrls: ['./model-version-services.component.scss'],
  providers: [ServicesSupportService],
})
export class ModelVersionServicesComponent implements OnInit {
  @Input() modelVersion: ModelVersion;

  serviceSupported$: Observable<{ [serviceName: string]: ServiceSupported }>;
  constructor(private readonly servicesSupport: ServicesSupportService) {}

  ngOnInit() {
    this.serviceSupported$ = this.servicesSupport.getServiceSupported();
    this.servicesSupport.loadSupported(this.modelVersion);
  }
}
