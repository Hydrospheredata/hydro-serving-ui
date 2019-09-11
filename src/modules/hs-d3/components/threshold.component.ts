import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: '[hs-d3threshold]',
  template: `
    <svg:line
      x1="0"
      x2="1000"
      [attr.y1]="y1"
      [attr.y2]="y2"
      stroke="#E12D39"
      stroke-dasharray="10px"
    ></svg:line>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3ThresholdComponent implements OnInit, OnChanges {
  @Input() yScale;
  @Input() 'hs-d3threshold';

  y1: number = 0;
  y2: number = 0;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const threshold = changes['hs-d3threshold'];
    const yScale = changes.yScale;

    if (threshold && yScale) {
      const y = yScale.currentValue(threshold.currentValue) || 0;
      this.y1 = y;
      this.y2 = y;
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {}
}
