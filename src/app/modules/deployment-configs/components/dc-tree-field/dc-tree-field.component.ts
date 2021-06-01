import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hs-dc-tree-field',
  template: `<div class="dc-tree-field">
    <div class="dc-tree-field__name">{{ name }}</div>
    <div class="dc-tree-field__value">{{ value }}</div>
  </div> `,
  styleUrls: ['./dc-tree-field.component.scss'],
})
export class DcTreeFieldComponent {
  @Input() name: string;
  @Input() value: string | number;
  constructor() {}
}
