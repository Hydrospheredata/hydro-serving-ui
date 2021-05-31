import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'hs-charts',
  template: '',
})
export class ChartsComponent {
  @Input() timeInterval: any;
  @Input() detailedCharts: any;
  @Input() siblingModelVersions: any;
  @Output()
  addedModelVersionIdToCompare: EventEmitter<any> = new EventEmitter();
}
