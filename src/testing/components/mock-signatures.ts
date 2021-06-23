import { Component, Input } from '@angular/core';
import { Signature } from '@app/core/data/types';

@Component({
  selector: 'hs-signatures',
  template: '',
})
export class SignaturesComponent {
  @Input() signature: Signature;
}
