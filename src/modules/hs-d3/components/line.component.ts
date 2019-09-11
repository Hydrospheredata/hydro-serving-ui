import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { line, select, easeLinear } from 'd3';

@Component({
  selector: '[hs-d3line]',
  template: `
    <svg:path #path></svg:path>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3LineComponent {
  @ViewChild('path', { read: ElementRef })
  path: ElementRef;
  @Input() 'hs-d3line';
  @Input() xScale;
  @Input() yScale;
  @Input() set data(data: number[][]) {
    if (data === undefined) {
      return;
    }

    if (data.some(([x, y]) => x === undefined || y === undefined)) {
      return;
    }

    const valueline = line()
      .x(d => this.xScale(d[0]))
      .y(d => this.yScale(d[1]));

    select(this.path.nativeElement)
      .data([data])
      .transition()
      .duration(500)
      .ease(easeLinear)
      .attr('d', valueline)
      .attr('stroke-width', '1px')
      .attr('fill', 'none');
  }
}
