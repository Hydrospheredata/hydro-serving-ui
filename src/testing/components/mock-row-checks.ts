import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-raw-checks',
  template: '',
})
export class RawChecksComponent {
  @Input() check: Check;
  @Input() modelVersion: ModelVersion;
  @Input() inputKeys: string[] = [];
  @Input() outputKeys: string[] = [];
}
