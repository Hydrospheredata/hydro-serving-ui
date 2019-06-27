import { Component, Input } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-req-res-logs',
  template: '',
})
export class ReqResLogsComponent {
  @Input() selectedModelVersion: ModelVersion;
}
