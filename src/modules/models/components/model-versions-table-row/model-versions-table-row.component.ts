import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModelVersion, ModelVersionStatus } from '@shared/_index';

@Component({
    selector: '[hs-model-versions-table-row]',
    templateUrl: './model-versions-table-row.component.html',
    styleUrls: ['./model-versions-table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionsTableRowComponent {
     @Input()
     modelVersion: ModelVersion;
}
