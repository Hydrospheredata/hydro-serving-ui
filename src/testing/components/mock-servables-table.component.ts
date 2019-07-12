import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'hs-servables-table',
  template: '',
})
export class ServablesTableComponent {
  @Input() servables: [];
  @Output() showedLog: EventEmitter<string> = new EventEmitter<string>();
}
