import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-menu-trigger',
  templateUrl: './menu-trigger.component.html',
  styleUrls: ['./menu-trigger.component.scss'],
})
export class MenuTriggerComponent {
  @Input() isActive: boolean;
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  constructor() {}

  handleClick() {
    this.isActive ? this.closed.emit() : this.opened.emit();
  }
}
