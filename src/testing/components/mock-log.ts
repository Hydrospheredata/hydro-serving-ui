import { Component, Input } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-log',
  template: '',
})
export class LogComponent {
  @Input() modelVersion: ModelVersion;
  @Input() checks: any[] = [];
  @Input() loading: boolean;
}
