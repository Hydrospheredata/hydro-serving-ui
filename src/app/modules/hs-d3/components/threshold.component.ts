import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: '[hs-d3threshold]',
  template: `
    <svg:line
      x1="0"
      [attr.x2]="x2"
      [attr.y1]="y1"
      [attr.y2]="y2"
      stroke="#E12D39"
      stroke-dasharray="10px"
    ></svg:line>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3ThresholdComponent implements OnChanges {
  @Input() yScale;
  @Input() 'hs-d3threshold';
  @Input() width: number;

  y1: number = 0;
  y2: number = 0;
  x2: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const threshold = changes['hs-d3threshold']
      ? changes['hs-d3threshold']
      : this['hs-d3threshold'];
    const yScale = changes.yScale ? changes.yScale.currentValue : this.yScale;
    const width = changes.width ? changes.width.currentValue : this.width;

    if (threshold !== undefined && yScale) {
      const y = yScale(threshold) || 0;
      this.y1 = y;
      this.y2 = y;
      this.x2 = width;
    }
  }
}
