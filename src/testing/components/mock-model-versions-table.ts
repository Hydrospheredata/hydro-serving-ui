import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-model-versions-table',
  template: '',
})
export class ModelVersionsTableComponent {
  @Input() modelVersions;
}
