import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: '[hsd3area]',
    template: `
    <svg:path
        #path
        [attr.stroke]="stroke"
    ></svg:path>`,
})
export class D3AreaComponent implements AfterViewInit {
    @ViewChild('path', {read: ElementRef})
    path: ElementRef;

    @Input() hsd3area;
    @Input() xScale;
    @Input() yScale;
    @Input() data;

    ngAfterViewInit(): void {
        const area = d3.area().curve(d3.curveMonotoneX)
            .x((d: any) => this.xScale(new Date(d.timestamp * 1000)))
            .y1((d: any) => this.yScale(new Date(d.value)))
            .y0(this.yScale(this.minValue(this.data)));

        d3.select(this.path.nativeElement)
            .data([this.data])
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr('d', area);
    }

    private minValue(data) {
        return d3.min(data, d => (d as any).value);
    }
}
