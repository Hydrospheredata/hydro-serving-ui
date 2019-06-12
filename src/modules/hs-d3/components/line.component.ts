import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: '[hs-d3line]',
  template: `
    <svg:path #path></svg:path>
  `,
})
export class D3LineComponent implements AfterViewInit {
  @ViewChild('path', { read: ElementRef })
  path: ElementRef;

  @Input() 'hs-d3line';
  @Input() xScale;
  @Input() yScale;
  @Input() data;

  ngAfterViewInit(): void {
    const valueline = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x((d: any) => this.xScale(new Date(d.timestamp)))
      .y((d: any) => this.yScale(d.value));

    d3.select(this.path.nativeElement)
      .data([this.data])
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr('d', valueline)
      .attr('stroke-width', '2px')
      .attr('fill', 'none');
  }
}
