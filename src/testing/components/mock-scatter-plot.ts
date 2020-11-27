import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LinkRegime, Colorizer } from '@app/modules/visualization/models';

@Component({
  selector: 'hs-scatter-plot',
  template: '',
})
export class ScatterPlotComponent {
  @Input() readonly data: any;
  @Input() readonly colors: string[] = [];
  @Input() readonly top100: number[][] = [];
  @Input() readonly counterfactuals: number[][];
  @Input() readonly colorizer: Colorizer;
  @Input() linkRegime: LinkRegime;
  @Output() selectPoint: EventEmitter<any> = new EventEmitter();
}
