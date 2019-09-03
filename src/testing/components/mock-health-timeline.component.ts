import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-health-timeline',
  template: '',
})
export class HealthTimelineComponent {
  @Input() timeInterval;
  @Input() detailedAggregation;
  @Input() isLive;
  @Input() fullAggregation;
  @Input() timeBound;
  @Output() stopped: EventEmitter<any> = new EventEmitter();
  @Output() started: EventEmitter<any> = new EventEmitter();
  @Output() timeIntervalChanged: EventEmitter<any> = new EventEmitter();
  @Output() timeBoundChanged: EventEmitter<any> = new EventEmitter();
}
