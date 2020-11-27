import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Signature } from '@app/core/data/types';

@Component({
  selector: 'hs-application-signature',
  templateUrl: './application-signature.component.html',
  styleUrls: ['./application-signature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSignatureComponent {
  @Input() signature: Signature;
}
