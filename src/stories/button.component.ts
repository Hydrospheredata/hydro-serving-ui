import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-button',
  template: ` <button
    hs-button
    type="button"
    (click)="onClick.emit($event)"
    [ngClass]="classes"
    [disabled]="disabled"
  >
    {{ label }}
  </button>`,
  styleUrls: ['./button.scss'],
})
export default class ButtonComponent {
  @Input()
  kind: 'base' | 'flat' | 'stroked';

  @Input()
  disabled = false;

  @Input()
  color: 'base' | 'primary' | 'accent' | 'warning' | 'cyan';

  @Input()
  label = 'Button';

  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    return [
      'hs-button',
      `hs-button--${this.kind}`,
      `hs-button--${this.kind}-${this.color}`,
    ];
  }
}
