import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-health-timeline',
  template: '',
})
export class HealthTimelineComponent {
  @Input() metricSpecifications;
  @Input() selectedModelVersion;
  @Input() live;
}
