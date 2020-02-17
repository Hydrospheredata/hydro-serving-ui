import { Component, ChangeDetectionStrategy, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { Servable } from '@servables/models';
import { ModelVersion, ISignature } from '@shared/_index';

@Component({
  selector: 'hs-model-version-details',
  template: '',
  providers: [ModelVersionLogService],
})
export class ModelVersionDetailsComponent {
  @ViewChild('logContainer', { read: ViewContainerRef })
  logContainer: ViewContainerRef;

  @Input() modelVersion: ModelVersion;
  @Input() servables: Servable[];
  @Input() signature: ISignature;
  @Input() services: any = [
    { name: 'monitoring', status: 'ok' },
    { name: 'profiler', status: 'ok' },
  ];
}
