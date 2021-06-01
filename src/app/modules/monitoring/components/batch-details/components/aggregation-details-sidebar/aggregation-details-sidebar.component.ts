import { Component, OnInit, Input } from '@angular/core';
import { CheckCollection } from '../../../../models';

@Component({
  selector: 'hs-aggregation-details-sidebar',
  templateUrl: './aggregation-details-sidebar.component.html',
  styleUrls: ['./aggregation-details-sidebar.component.scss'],
})
export class AggregationDetailsSidebarComponent {
  @Input() checkCollection: CheckCollection;
  constructor() {}
}
