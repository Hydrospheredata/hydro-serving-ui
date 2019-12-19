import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-requests-information',
  template: '',
})
export class RequestsInformationComponent {
  @Input() aggregation: any;
  @Input() latency;
  @Input() errors = [];
}
