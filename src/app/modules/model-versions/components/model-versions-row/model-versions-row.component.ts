import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-model-versions-row',
  templateUrl: './model-versions-row.component.html',
  styleUrls: ['./model-versions-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionsRowComponent {
  @Input() modelVersion: ModelVersion;
}
