import { Component, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { Servable } from '@app/core/data/types';
import { ModelVersion, Signature } from '@app/core/data/types';

@Component({
  selector: 'hs-model-version-details',
  template: '',
})
export class ModelVersionDetailsComponent {
  @ViewChild('logContainer', { read: ViewContainerRef, static: true })
  logContainer: ViewContainerRef;

  @Input() modelVersion: ModelVersion;
  @Input() servables: Servable[];
  @Input() signature: Signature;
  @Input() services: any = [
    { name: 'monitoring', status: 'ok' },
    { name: 'profiler', status: 'ok' },
  ];
}
