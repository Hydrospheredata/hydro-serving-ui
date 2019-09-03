import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { RiseExplanation, AnchorExplanation } from '@rootcause/models';
import { ModelVersion } from '@shared/_index';
import { ReqstoreEntry } from '@shared/models/reqstore.model';

export const EXPLANATION = new InjectionToken<RiseExplanation | AnchorExplanation>('explanation');
export const METHOD = new InjectionToken<string>('method');
export const REQSTORE_ENTRY = new InjectionToken<ReqstoreEntry>(
  'reqstore item'
);
export const MODEL_VERSION = new InjectionToken<ModelVersion>('model version');
@Component({
  templateUrl: 'explanation.component.html',
  styleUrls: ['explanation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationComponent implements OnInit {
  get isRise(): boolean {
    return this.method === 'rise';
  }

  constructor(
    private dialogService: DialogService,
    @Inject(EXPLANATION) public explanation: RiseExplanation | AnchorExplanation,
    @Inject(REQSTORE_ENTRY) public reqstoreEntry: ReqstoreEntry,
    @Inject(MODEL_VERSION) public modelVersion: ModelVersion,
    @Inject(METHOD) public method: string
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogService.closeDialog();
  }

  get started_at(): string {
    return this.explanation.started_at;
  }
  get completed_at(): string {
    return this.explanation.completed_at;
  }
}
