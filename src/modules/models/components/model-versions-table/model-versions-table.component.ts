import { Component, Input } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
    selector: 'hs-model-versions-table',
    templateUrl: './model-versions-table.component.html',
    styleUrls: ['./model-versions-table.component.scss'],
})
export class ModelVersionsTableComponent {
    @Input()
    modelVersions: ModelVersion[];
}
