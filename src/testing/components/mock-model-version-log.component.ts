import { Component, Input } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-model-version-log',
  template: '',
})
export class ModelVersionLogComponent {
  @Input() modelVersion: ModelVersion;
}
