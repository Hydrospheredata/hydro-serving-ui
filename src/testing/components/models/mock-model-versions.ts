import { Component, Input } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-model-versions',
  template: '',
})
export class ModelVersionsComponent {
  @Input() modelVersions: ModelVersion[] = [];
}
