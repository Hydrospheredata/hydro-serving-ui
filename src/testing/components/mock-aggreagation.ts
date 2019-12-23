import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-aggregation',
  template: '',
})
export class AggregationComponent {
  @Input() aggregation: any;
  @Input() latency: number[];
  @Input() errors: boolean[];
  @Input() canLoadLeft: boolean;
  @Input() canLoadRight: boolean;
  @Input() totalRequests: number;
  @Input() currentRequests: number;
  @Input() loading: boolean;
  @Output() changedSelectedColumn = new EventEmitter<number>();
  @Output() loadedOlder = new EventEmitter<string>();
  @Output() loadedNewest = new EventEmitter<string>();
}
