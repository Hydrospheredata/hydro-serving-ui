import { Component, Input } from '@angular/core';
import { ModelsFacade } from '@models/store';

@Component({
  selector: 'hydro-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss'],
})
export class SignaturesComponent {
  signature$ = this.models.signatureWithFieldNames$;
  constructor(private models: ModelsFacade) {}
}
