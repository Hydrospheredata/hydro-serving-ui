import { Directive, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Directive({
    selector: '[hsD3Line]',
})
export class D3LineDirective {
    @Input() xScale;
    @Input() yScale;

    @Input()
    set data(data) {
        const valueline = d3.line().curve(d3.curveMonotoneX)
            .x((d: any) => this.xScale(new Date(d.timestamp)))
            .y((d: any) => this.yScale(new Date(d.value)));

        d3.select(this.el.nativeElement)
            .data([data])
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
            .attr('d', valueline)
            .attr('fill', 'none');
    }

    constructor(
        public el: ElementRef
    ) {
    }
}
