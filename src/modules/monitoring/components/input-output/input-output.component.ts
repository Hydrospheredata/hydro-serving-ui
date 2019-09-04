import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import {
  ExplanationComponent,
  EXPLANATION,
  REQSTORE_ENTRY,
  MODEL_VERSION,
  METHOD,
} from '@rootcause/containers';
import { ExplanationJobStatus } from '@rootcause/interfaces';
import { ExplanationTask } from '@rootcause/models';
import { RootCauseFacade } from '@rootcause/store/root-cause.facade';
import { ModelVersion } from '@shared/_index';
import {
  PredictRequest,
  PredictResponse,
} from '@shared/components/metrics/req';
import { ReqstoreEntry } from '@shared/models/reqstore.model';
import { getFiledNameByTensorDataType } from '@shared/utils/field-name-by-tensor-data-type';
import { fromSnakeToCamel } from '@shared/utils/from-snake-to-camel';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { filter, switchMap, tap, take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'hs-input-output',
  templateUrl: 'input-output.component.html',
  styleUrls: ['input-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOutputComponent implements OnChanges {
  get uid(): string {
    return this.reqstoreEntry.uid;
  }
  @Input()
  reqstoreEntry: ReqstoreEntry;
  @Input()
  modelVersion: ModelVersion;

  @Output() createdExplanationTask: EventEmitter<any> = new EventEmitter();

  selectedUid$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  explanationTasks$: Observable<ExplanationTask[]>;
  fetchExplanations: Subscription;
  constructor(
    private rootCauseFacade: RootCauseFacade,
    private dialog: DialogService
  ) {
    this.explanationTasks$ = this.selectedUid$.pipe(
      filter(val => val !== undefined),
      switchMap(uid =>
        this.rootCauseFacade
          .getTasks(uid)
          .pipe(filter(val => val !== undefined))
      )
    );

    this.fetchExplanations = this.selectedUid$
      .pipe(
        switchMap(uid =>
          this.explanationTasks$.pipe(
            tap(tasks => {
              tasks.forEach(task => {
                if (
                  task.status.state === ExplanationJobStatus.success
                ) {
                  this.rootCauseFacade.getResult({ uid, task });
                }
                if (
                  (
                    task.status.state === ExplanationJobStatus.pending ||
                    task.status.state === ExplanationJobStatus.started
                  ) &&
                    task.status.task_id !== undefined
                ) {
                  this.rootCauseFacade.fetchExplanation({
                    uid,
                    taskId: task.status.task_id,
                    method: task.method,
                  });
                }
              });
            }),
            take(1)
          )
        )
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.reqstoreEntry) {
      return;
    }
    this.selectedUid$.next(changes.reqstoreEntry.currentValue.uid);
    this.getAllMethods();
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

  createExplanationTask(method: string): void {
    this.rootCauseFacade.createExplanationTask({
      modelVersion: this.modelVersion,
      reqstoreEntry: this.reqstoreEntry,
      method,
    });
  }

  showExplanation({ explanation, method }: ExplanationTask) {
    this.dialog.createDialog({
      component: ExplanationComponent,
      providers: [
        {
          provide: EXPLANATION,
          useValue: explanation,
        },
        {
          provide: REQSTORE_ENTRY,
          useValue: this.reqstoreEntry,
        },
        {
          provide: MODEL_VERSION,
          useValue: this.modelVersion,
        },
        {
          provide: METHOD,
          useValue: method,
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

  private getAllMethods() {
    const {
      modelVersion: {
        model: { name },
        modelVersion,
      },
      reqstoreEntry: { ts, uid },
    } = this;
    const params = {
      model_name: name,
      model_version: `${modelVersion}`,
      ts,
      uid,
    };

    this.rootCauseFacade.getAllStatuses({
      params,
    });
  }
}
