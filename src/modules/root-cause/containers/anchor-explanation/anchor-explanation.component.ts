import { Component, OnInit, Input } from '@angular/core';
import { ExplanationJob, Explanation } from '@rootcause/models';
import { ReqstoreEntry } from '@shared/models/reqstore.model';

@Component({
  selector: 'hs-anchor-explanation',
  templateUrl: './anchor-explanation.component.html',
  styleUrls: ['./anchor-explanation.component.scss'],
})
export class AnchorExplanationComponent implements OnInit {
  @Input() reqstoreEntry: ReqstoreEntry;
  @Input() explanationJob: ExplanationJob;

  ngOnInit() {}

  get explanation(): Explanation {
    return this.explanationJob.explanation;
  }
}
