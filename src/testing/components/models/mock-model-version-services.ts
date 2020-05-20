import { Component, OnInit, Input } from '@angular/core';
import { ModelVersion } from '@shared/models';

@Component({
  selector: 'hs-model-version-services',
  template: '',
})
export class ModelVersionServicesComponent {
  @Input() modelVersion: ModelVersion;
}
