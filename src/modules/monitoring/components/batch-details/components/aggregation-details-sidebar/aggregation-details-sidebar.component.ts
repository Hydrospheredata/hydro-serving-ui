import { Component, OnInit, Input } from '@angular/core';
import { CheckCollection } from '@monitoring/models';

@Component({
  selector: 'hs-aggregation-details-sidebar',
  templateUrl: './aggregation-details-sidebar.component.html',
  styleUrls: ['./aggregation-details-sidebar.component.scss'],
})
export class AggregationDetailsSidebarComponent implements OnInit {
  @Input() checkCollection: CheckCollection;
  constructor() {}

  ngOnInit() {}
}
