import { Component, Input } from '@angular/core';
import { AnchorExplanationResult } from '../../models';

@Component({
  selector: 'hs-anchor-explanation',
  templateUrl: './anchor-explanation.component.html',
  styleUrls: ['./anchor-explanation.component.scss'],
})
export class AnchorExplanationComponent {
  @Input() explanation: AnchorExplanationResult;

  get coverage(): number {
    return this.explanation.coverage;
  }

  get explanations(): string[] {
    return this.explanation.explanation;
  }

  get precision(): number {
    return this.explanation.precision;
  }

  get fieldName(): string {
    return this.explanation.explained_field_name;
  }

  get fieldValue(): number | string {
    return this.explanation.explained_field_value;
  }
}
