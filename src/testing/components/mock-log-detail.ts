import { Input, Component } from '@angular/core';
import {Check} from "@monitoring/interfaces";
import {ModelVersion} from "@shared/models/model-version.model";
@Component({
  selector: 'hs-log-detail',
  template: '',
})
export class LogDetailComponent {
  @Input() check: Check;
  @Input() modelVersion: ModelVersion;
}
