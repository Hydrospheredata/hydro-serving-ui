import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Aggregation } from '@monitoring/models/Aggregation';

@Component({
  selector: 'hs-requests-information',
  templateUrl: './requests-information.component.html',
  styleUrls: ['./requests-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsInformationComponent {
  @Input() aggregation: Aggregation;
  @Input() latency;
  @Input() errors = [];

  get additionalInfo() {
    return this.aggregation;
  }

  get firstId() {
    return this.aggregation.from;
  }
  get lastId() {
    return this.aggregation.to;
  }
  get requests() {
    return this.aggregation.hs_requests;
  }
}
