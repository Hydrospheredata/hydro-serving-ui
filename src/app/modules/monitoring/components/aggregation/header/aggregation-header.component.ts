import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AggregationsList } from '../../../models';

@Component({
  selector: 'hs-aggregation-header',
  templateUrl: './aggregation-header.component.html',
  styleUrls: ['./aggregation-header.component.scss'],
})
export class AggregationHeaderComponent {
  @Input() canLoadOlder: boolean;
  @Input() canLoadNewer: boolean;
  @Input() aggregationList: AggregationsList;

  @Output() loadNewer: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadOlder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onLoadOlder(): void {
    this.loadOlder.next();
  }
  onLoadNewer(): void {
    this.loadNewer.next();
  }
}
