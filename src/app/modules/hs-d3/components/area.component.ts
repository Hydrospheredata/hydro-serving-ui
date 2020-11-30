import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: '[hs-d3area]',
  template: ` <svg:path #path></svg:path> `,
})
export class D3AreaComponent implements AfterViewInit {
  @ViewChild('path', { read: ElementRef, static: true })
  path: ElementRef;

  @Input() 'hs-d3area';
  @Input() xScale;
  @Input() yScale;
  @Input() y0 = 0;
  @Input() set data(d: Array<[number, number]>) {
    d3.select(this.path.nativeElement)
      .data([d])
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr('d', this.area);
  }
  @Input() stroke;

  private area;
  ngAfterViewInit(): void {
    this.area = d3
      .area()
      .x((d: any) => {
        const x = this.xScale(d[0]);
        console.dir({
          d0: d[0],
          x,
        });
        return this.xScale(d[0]);
      })
      .y1((d: any) => {
        console.dir({
          d1: d[1],
          y: this.yScale(d[1]),
        });
        return this.yScale(d[1]);
      })
      .y0(this.yScale(this.y0));
  }
}
