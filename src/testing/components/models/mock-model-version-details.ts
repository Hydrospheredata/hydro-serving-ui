import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  Input,
} from '@angular/core';
import { Servable } from '@app/core/data/types';
import { ModelVersion, ISignature } from '@app/core/data/types';
import { ModelVersionLogService } from '@app/modules/model-version/components/model-version-log/model-version-log.service';

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
