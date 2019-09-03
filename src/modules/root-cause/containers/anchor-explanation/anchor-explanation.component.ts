import { Component, OnInit, Input } from '@angular/core';
import { AnchorExplanation, AnchorExplanationResult } from '@rootcause/models';
import { ReqstoreEntry } from '@shared/models/reqstore.model';

@Component({
  selector: 'hs-anchor-explanation',
  templateUrl: './anchor-explanation.component.html',
  styleUrls: ['./anchor-explanation.component.scss'],
})
export class AnchorExplanationComponent implements OnInit {
  @Input() reqstoreEntry: ReqstoreEntry;
  @Input() explanation: AnchorExplanation;

  ngOnInit() {}

  get result(): AnchorExplanationResult {
    return this.explanation.result;
  }

  get coverage(): number {
    return this.result.coverage;
  }
  get explanations(): string[] {
    return this.result.explanation;
  }
  get precision(): number {
    return this.result.precision;
  }
}
