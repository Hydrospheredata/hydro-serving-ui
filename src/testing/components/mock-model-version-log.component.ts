import { Component, Input } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-model-version-log',
  template: '',
})
export class ModelVersionLogComponent {
  @Input() modelVersion: ModelVersion;
}
