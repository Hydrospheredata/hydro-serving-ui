import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { line, select, easeLinear } from 'd3';

@Component({
  selector: '[hs-d3line]',
  template: `
    <svg:path #path></svg:path>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3LineComponent implements OnChanges {
  @ViewChild('path', { read: ElementRef })
  path: ElementRef;
  @Input() 'hs-d3line';
  @Input() xScale;
  @Input() yScale;
  @Input() data: number[][];

  ngOnChanges(changes) {
    const xScale = changes.xScale.currentValue;
    const yScale = changes.yScale.currentValue;
    const data = changes.data.currentValue;

    if (data.some(([x, y]) => x === undefined || y === undefined)) {
      return;
    }

    const valueline = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

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
