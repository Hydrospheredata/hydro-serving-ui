import { Component, Input } from '@angular/core';
import { Signature } from '@app/core/data/types';

@Component({
  selector: 'hs-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss'],
})
export class SignaturesComponent {
  @Input() signature: Signature;
  @Input() fields: Map<string, string[]> = new Map([]);
}
