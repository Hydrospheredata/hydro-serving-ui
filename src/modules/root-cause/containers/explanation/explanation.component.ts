import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelVersion } from '@shared/_index';
import { ReqstoreEntry } from '@shared/models/reqstore.model';
import { ExplanationJob } from '../../models';

export const EXPLANATION_JOB = new InjectionToken<ExplanationJob>(
  'explanation job'
);
export const REQSTORE_ENTRY = new InjectionToken<ReqstoreEntry>(
  'reqstore item'
);
export const MODEL_VERSION = new InjectionToken<ModelVersion>(
  'model version'
);
@Component({
  templateUrl: 'explanation.component.html',
  styleUrls: ['explanation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationComponent implements OnInit {
  get isRise(): boolean {
    return this.explanationJob.explanationType === 'rise';
  }

  constructor(
    private dialogService: DialogService,
    @Inject(EXPLANATION_JOB) public explanationJob: ExplanationJob,
    @Inject(REQSTORE_ENTRY) public reqstoreEntry: ReqstoreEntry,
    @Inject(MODEL_VERSION) public modelVersion: ModelVersion
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogService.closeDialog();
  }
}
