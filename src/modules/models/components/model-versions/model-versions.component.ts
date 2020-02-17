import { Component, Input } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-model-versions',
  templateUrl: './model-versions.component.html',
  styleUrls: ['./model-versions.component.scss'],
})
export class ModelVersionsComponent {
  @Input() modelVersions: ModelVersion[] = [];
}
