import { Component, Input } from '@angular/core';
import { ISignature } from '@shared/models';

@Component({
  selector: 'hydro-signatures',
  template: '',
})
export class SignaturesComponent {
  @Input() signature: ISignature;
}
