import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ChecksAggregation } from '@monitoring/interfaces';

@Component({
  selector: 'hs-requests-information',
  templateUrl: './requests-information.component.html',
  styleUrls: ['./requests-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsInformationComponent implements OnInit {
  @Input() aggregation: ChecksAggregation;
  @Input() latency;
  @Input() errors = [];

  ngOnInit() {}

  get firstId() {
    return this.aggregation.additionalInfo._hs_first_id;
  }
  get lastId() {
    return this.aggregation.additionalInfo._hs_last_id;
  }
  get requests() {
    return this.aggregation.additionalInfo._hs_requests;
  }
}
