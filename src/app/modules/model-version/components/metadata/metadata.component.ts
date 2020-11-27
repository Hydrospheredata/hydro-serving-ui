import { Component, Input } from '@angular/core';
import { isEmpty } from 'lodash';

@Component({
  selector: 'hs-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
})
export class MetadataComponent {
  @Input()
  metadata: object;

  isEmpty() {
    return isEmpty(this.metadata);
  }
}
