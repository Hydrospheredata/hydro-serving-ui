import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-scatter-plot',
  template: '',
})
export class ScatterPlotComponent {
  @Input() readonly data: any;
  @Input() readonly colors: string[] = [];
  @Input() readonly top100: number[] = [];
  @Input() readonly showTop100: boolean = false;
  @Output() selectPoint: EventEmitter<any> = new EventEmitter();
}
