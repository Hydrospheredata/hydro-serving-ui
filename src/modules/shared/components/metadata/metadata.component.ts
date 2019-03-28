import { Component, Input } from '@angular/core';

@Component({
    selector: 'hs-metadata',
    templateUrl: './metadata.component.html',
    styleUrls: ['./metadata.component.scss'],
})
export class MetadataComponent {
    @Input()
    metadata: object;
}
