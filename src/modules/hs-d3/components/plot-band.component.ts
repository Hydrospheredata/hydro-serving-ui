import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { SonarMetricData } from '@shared/_index';

@Component({
  selector: '[hs-d3-plot-band]',
  template: `
    <svg:rect
      [attr.x]='x'
      y='0'
      [attr.width]='width'
      [attr.height]='height'></svg:rect>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3PlotBandComponent implements OnInit {
  @Input() 'hs-d3-plot-band': {from: SonarMetricData, to: SonarMetricData};
  @Input() height;
  @Input()
  set xScale(scale) {
    if (this['hs-d3-plot-band']) {
      const from = this['hs-d3-plot-band'].from.timestamp;
      const to = this['hs-d3-plot-band'].to.timestamp;

      const y = scale(new Date(to));
      this.x = scale(new Date(from));
      this.width = y - this.x;
    }
  }

  x: number = 0;
  width: number = 0;

  ngOnInit() {}
}
