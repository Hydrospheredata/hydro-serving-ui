import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ChecksAggregation } from '@monitoring/interfaces';

@Component({
  selector: 'hs-requests-information',
  templateUrl: './requests-information.component.html',
  styleUrls: ['./requests-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsInformationComponent {
  @Input() aggregation: ChecksAggregation;
  @Input() latency;
  @Input() errors = [];

  get additionalInfo() {
    return this.aggregation.additionalInfo;
  }

  get firstId() {
    return this.additionalInfo._hs_first_id;
  }
  get lastId() {
    return this.additionalInfo._hs_last_id;
  }
  get requests() {
    return this.additionalInfo._hs_requests;
  }
}
