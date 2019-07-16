import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: '[hs-d3threshold]',
  template: `
    <svg:line x1="0" x2="1000" [attr.y1]="y1" [attr.y2]="y2"></svg:line>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class D3ThresholdComponent implements OnInit {
  @Input() 'hs-d3threshold';
  @Input()
  set yScale(scale) {
    if (this['hs-d3threshold']) {
      const y = scale(this['hs-d3threshold']) || 0;
      this.y1 = y + 10;
      this.y2 = y + 10;
    }
  }

  y1: number = 0;
  y2: number = 0;

  ngOnInit() {}
}
