import { Directive, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Directive({
    selector: '[hsD3Axis]',
})
export class D3AxisDirective {
    @Input()
    set scale(scale) {
        if (!scale) { return; }
        const xAxis = d3.axisBottom(scale);
        d3.select(this.el.nativeElement).call(xAxis);
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
