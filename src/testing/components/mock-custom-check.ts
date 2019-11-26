import { Component, Input } from '@angular/core';
import { CustomCheck } from '@monitoring/interfaces';

@Component({
  selector: 'hs-custom-check',
  template: '',
})
export class CustomCheckComponent {
  @Input()
  check: CustomCheck;
}
