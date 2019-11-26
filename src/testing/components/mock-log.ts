import { Component, Input } from '@angular/core';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-log',
  template: '',
})
export class LogComponent {
  @Input() modelVersion: ModelVersion;
  @Input() checks: Check[] = [];
}
