import { Component, Input } from '@angular/core';
import { AnchorExplanationResult } from '@rootcause/models';

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
}
