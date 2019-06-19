import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-chart',
  template: '',
})
export class ChartComponent {
  @Input() metrics;
  @Input() liveUpdate;
  @Input() timeBoundary;
}
