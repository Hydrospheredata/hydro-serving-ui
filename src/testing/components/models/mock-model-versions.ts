import { Component, Input } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-model-versions',
  template: '',
})
export class ModelVersionsComponent {
  @Input() modelVersions: ModelVersion[] = [];
}
