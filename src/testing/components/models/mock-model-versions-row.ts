import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-model-versions-row',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionsRowComponent {
  @Input() modelVersion: ModelVersion;
}
