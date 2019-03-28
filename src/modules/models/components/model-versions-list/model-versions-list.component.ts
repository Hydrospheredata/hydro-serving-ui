import { Component, Input } from '@angular/core';
import { IModelVersion } from '@shared/_index';

@Component({
    selector: 'hs-model-versions-list',
    templateUrl: './model-versions-list.component.html',
    styleUrls: ['./model-versions-list.component.scss'],
})
export class ModelVersionsListComponent {
    @Input()
    modelVersions: IModelVersion[];
}
