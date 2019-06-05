import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: '[hsd3line]',
    template: `
    <svg:path
        #path
        [attr.stroke]="stroke"
    ></svg:path>`,
})
export class D3LineComponent implements AfterViewInit {
    @ViewChild('path', {read: ElementRef})
    path: ElementRef;

    @Input() hsd3line;
    @Input() xScale;
    @Input() yScale;
    @Input() data;
    @Input() stroke: string = 'grey';



    ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        const valueline = d3.line().curve(d3.curveMonotoneX)
            .x((d: any) => this.xScale(new Date(d.timestamp * 1000)))
            .y((d: any) => this.yScale(new Date(d.value)));

        d3.select(this.path.nativeElement)
            .data([this.data])
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
            .attr('d', valueline)
            .attr('fill', 'none');
    }
}
