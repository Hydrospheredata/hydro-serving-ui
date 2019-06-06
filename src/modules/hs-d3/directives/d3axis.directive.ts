import { Directive, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

type AxisPosition = 'top' | 'left' | 'bottom' | 'right';

@Directive({
    selector: '[hsD3Axis]',
})
export class D3AxisDirective {
    @Input() position: AxisPosition = 'bottom';

    @Input()
    set scale(scale) {
        if (!scale) { return; }
        let axis;

        switch (this.position) {
            case 'left':
                axis = d3.axisLeft(scale).ticks(5);
                break;
            default:
                axis = d3.axisBottom(scale);
        }
        d3.select(this.el.nativeElement).call(axis);
    }

    @Input()
    set transform(transform: string) {
        if (transform) {
            this.el.nativeElement.setAttribute('transform', transform);
        }
    }

    constructor(
        public el: ElementRef
    ) {
    }
}
