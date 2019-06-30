import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-req-res-logs',
  template: '',
})
export class ReqResLogsComponent {
  @Input() modelVersion$: any;
  @Input() timeInterval$: any;
  @Input() metricSpecs$: any;
}
