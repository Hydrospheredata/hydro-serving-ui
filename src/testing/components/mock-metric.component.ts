import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-metric',
  template: '',
})
export class MetricComponent {
  @Input() metric;
  @Output() deleteMetric = new EventEmitter();
}
