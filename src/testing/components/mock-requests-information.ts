import { Component, Input } from '@angular/core';

import { ChecksAggregation } from '@monitoring/interfaces';

@Component({
  selector: 'hs-requests-information',
  template: '',
})
export class RequestsInformationComponent {
  @Input() aggregation: ChecksAggregation;
  @Input() latency;
  @Input() errors = [];
}
