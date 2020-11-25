import { Component, OnInit, Input } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-model-version-services',
  template: '',
})
export class ModelVersionServicesComponent {
  @Input() modelVersion: ModelVersion;
}
