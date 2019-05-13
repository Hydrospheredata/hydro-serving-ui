import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IModelVersion, ModelVersionStatus } from '@shared/_index';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';

@Component({
    selector: '[hs-model-versions-table-row]',
    templateUrl: './model-versions-table-row.component.html',
    styleUrls: ['./model-versions-table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionsTableRowComponent {
     @Input()
     modelVersion: IModelVersion;

     isRealsed(): boolean {
        return this.modelVersion.status === ModelVersionStatus.Released;
     }
}
