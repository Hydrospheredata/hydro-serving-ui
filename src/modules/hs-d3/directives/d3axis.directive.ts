import { Directive, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { ScaleLinear, format } from 'd3';

type AxisPosition = 'top' | 'left' | 'bottom' | 'right';

@Directive({
  selector: '[hsD3Axis]',
})
export class D3AxisDirective {
  @Input() position: AxisPosition = 'bottom';

  @Input() ticks: number = 3;
  @Input()
  set scale(scale: ScaleLinear<number, number>) {
    if (!scale) {
      return;
    }
    let axis;

    switch (this.position) {
      case 'left':

        axis = d3.axisLeft(scale).ticks(this.ticks);
        break;
      default:
        axis = d3.axisBottom(scale).ticks(this.ticks);
    }
    d3.select(this.el.nativeElement).call(axis);
  }

  @Input()
  set transform(transform: string) {
    if (transform) {
      this.el.nativeElement.setAttribute('transform', transform);
    }
  }

  constructor(public el: ElementRef) {
    this.el.nativeElement.setAttribute('color', '#486581');
  }
}
