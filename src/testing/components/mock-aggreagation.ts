import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-aggregation',
  template: '',
})
export class AggregationComponent {
  @Input() aggregation: any;
  @Input() latency: number[];
  @Input() errors: boolean[];
  @Output() changedSelectedColumn = new EventEmitter<number>();
}
