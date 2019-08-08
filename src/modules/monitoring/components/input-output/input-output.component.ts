import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import {
  ExplanationComponent,
  EXPLANATION_JOB,
  REQSTORE_ENTRY,
  MODEL_VERSION,
} from '@rootcause/containers';
import { ExplanationJob, ExplanationJobStatus } from '@rootcause/models';
import { RootCauseFacade } from '@rootcause/store/root-cause.facade';
import { ModelVersion } from '@shared/_index';
import {
  PredictRequest,
  PredictResponse,
} from '@shared/components/metrics/req';
import { ReqstoreEntry } from '@shared/models/reqstore.model';
import { getFiledNameByTensorDataType } from '@shared/utils/field-name-by-tensor-data-type';
import { fromSnakeToCamel } from '@shared/utils/from-snake-to-camel';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'hs-input-output',
  templateUrl: 'input-output.component.html',
  styleUrls: ['input-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOutputComponent implements OnInit, OnChanges {
  get uid(): string {
    return this.reqstoreEntry.uid + '_' + this.reqstoreEntry.ts;
  }
  @Input()
  reqstoreEntry: ReqstoreEntry;
  @Input()
  modelVersion: ModelVersion;

  @Output() queuedExplanation: EventEmitter<any> = new EventEmitter();

  uidChanged$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  explanationJob$: Observable<ExplanationJob>;
  canExplain$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private rootCauseFacade: RootCauseFacade,
    private dialog: DialogService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.reqstoreEntry) {
      return;
    }
    if (this.canBeExplain()) {
      const { uid, ts } = changes.reqstoreEntry.currentValue;

      this.canExplain$.next(true);
      this.uidChanged$.next(`${uid}_${ts}`);
    }
  }

  ngOnInit() {
    this.explanationJob$ = this.uidChanged$.pipe(
      filter(val => val !== undefined),
      switchMap(uid => this.rootCauseFacade.getExplanationJob(uid))
    );
  }

  isImage(inputName: string): boolean {
    const isImage = this.modelVersion.modelContract.predict.inputs.some(
      p => p.name === inputName && p.profile === 'IMAGE'
    );
    return isImage;
  }

  getValue(tensorProto): any {
    const field = fromSnakeToCamel(
      getFiledNameByTensorDataType(tensorProto.dtype)
    );
    const data = tensorProto[field];
    return data;
  }

  getValueAsText(tensorProto): any {
    const field = fromSnakeToCamel(
      getFiledNameByTensorDataType(tensorProto.dtype)
    );
    const data = tensorProto[field];
    try {
      return data.join(', ');
    } catch {
      return data;
    }
  }

  showAsList(name: string) {
    if (name === 'probabilities') {
      return true;
    }
    return false;
  }

  queueExplanation(): void {
    this.rootCauseFacade.createExplanationJob({
      modelVersion: this.modelVersion,
      reqstoreEntry: this.reqstoreEntry,
    });
  }

  showExplanation(job: ExplanationJob) {
    this.dialog.createDialog({
      component: ExplanationComponent,
      providers: [
        {
          provide: EXPLANATION_JOB,
          useValue: job,
        },
        {
          provide: REQSTORE_ENTRY,
          useValue: this.reqstoreEntry,
        },
        {
          provide: MODEL_VERSION,
          useValue: this.modelVersion,
        },
      ],
    });
  }

  disableExplanationButton(status: ExplanationJobStatus) {
    switch (status) {
      case ExplanationJobStatus.queued:
      case ExplanationJobStatus.started:
      case ExplanationJobStatus.pending:
        return true;
      default:
        return false;
    }
  }

  private canBeExplain(): boolean {
    return this.rootCauseFacade.canBeExplain(this.modelVersion);
  }
}
