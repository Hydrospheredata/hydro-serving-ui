import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelVersionStatus } from '@app/core/data/types';

@Component({
  selector: 'hs-model-version-status',
  templateUrl: './model-version-status.component.html',
  styleUrls: ['./model-version-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionStatusComponent {
  @Input() status: ModelVersionStatus = ModelVersionStatus.Undefined;
}
