import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AggregationsList } from '@monitoring/models';

@Component({
  selector: 'hs-aggregation-sidebar',
  templateUrl: './aggregation-sidebar.component.html',
  styleUrls: ['./aggregation-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregationSidebarComponent implements OnInit {
  @Input() aggregationsList: AggregationsList;
  constructor() {}

  ngOnInit() {}
}
