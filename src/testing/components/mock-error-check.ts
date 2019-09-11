import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-error-check',
  template: '',
})
export class ErrorCheckComponent {
  @Input() data: Array<string | null> = [];
}
