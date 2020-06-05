import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'hs-drift-status',
  template: `<hydro-icon
    [type]="iconType"
    hsColorByDrift
    [drift]="driftValue"
    [ngStyle]="stylesMap"
  ></hydro-icon>`,
  styleUrls: ['./drift-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriftStatusComponent implements OnInit {
  @Input() set drift(val: number) {
    // this.iconType = val > 0 ? 'icon-error-outline' : 'check';
    this.driftValue = val;
  }
  @Input() size: number = 14;

  driftValue: number;
  iconType: 'icon-error-outline' | 'check' = 'icon-error-outline';

  get stylesMap() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
    };
  }

  constructor() {}
  ngOnInit() {}
}
