import { Component, Input } from '@angular/core';
import { ISignature } from '@app/core/data/types';

@Component({
  selector: 'hydro-signatures',
  template: '',
})
export class SignaturesComponent {
  @Input() signature: ISignature;
}
