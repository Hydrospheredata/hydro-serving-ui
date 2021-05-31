import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'hs-d3-plot-band',
  template: `<svg:rect
    [attr.x]="x"
    y="0"
    [attr.width]="width"
    [attr.height]="height"
  ></svg:rect>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3PlotBandComponent {
  @Input() 'hs-d3-plot-band': { from: number; to: number };
  @Input() height;
  @Input()
  set xScale(scale) {
    if (this['hs-d3-plot-band']) {
      const { to, from } = this['hs-d3-plot-band'];
      const y = scale(to);
      this.x = scale(from);
      this.width = y - this.x;
    }
  }

  x: number = 0;
  width: number = 0;
}
