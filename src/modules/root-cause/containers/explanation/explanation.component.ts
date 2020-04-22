import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ExplanationService } from '@rootcause/containers/explanation/explanation.service';
import { Explanation } from '@rootcause/services';
import {
  BehaviorSubject,
  merge,
  NEVER,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import {
  catchError,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';
import { DialogService } from '@dialog/dialog.service';
import { EXPLANATION, ExplanationDialogComponent } from '@rootcause/containers';

@Component({
  selector: 'hs-explanation',
  templateUrl: './explanation.component.html',
  viewProviders: [ExplanationService],
})
export class ExplanationComponent implements OnChanges, OnDestroy {
  @Input() requestId: string;
  @Input() modelVersionId: number;

  explanation$: Observable<Explanation>;

  private destroy: Subject<any> = new Subject<any>();
  private getExplanationCommand: Subject<any> = new Subject<any>();
  private inputChanged: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  constructor(
    private readonly service: ExplanationService,
    private readonly dialogService: DialogService
  ) {
    this.getExplanationCommand
      .asObservable()
      .pipe(
        switchMap(() => {
          return this.service.createExplanation(
            this.modelVersionId,
            this.requestId
          );
        }),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe();

    this.explanation$ = merge(this.inputChanged.asObservable()).pipe(
      switchMap(() =>
        this.service.getExplanation(this.requestId, this.modelVersionId).pipe(
          switchMap(explanation => {
            if (
              explanation.state === 'SUCCESS' ||
              explanation.state === 'FAILED' ||
              explanation.state === 'NOT_SUPPORTED'
            ) {
              return of(explanation);
            } else if (explanation.state === 'NOT_CALLED') {
              return this.getExplanationCommand.asObservable().pipe(
                switchMap(() => {
                  return this.pullingExplanation();
                }),
                startWith(explanation)
              );
            } else {
              return this.pullingExplanation();
            }
          })
        )
      ),
      catchError(err => {
        console.error(err);
        return NEVER;
      })
    );
  }

  showExplanation(result) {
    this.dialogService.createDialog({
      component: ExplanationDialogComponent,
      providers: [{ provide: EXPLANATION, useValue: result }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.requestId && changes.requestId.currentValue) ||
      (changes.modelVersionId && changes.modelVersionId.currentValue)
    ) {
      this.inputChanged.next('changes');
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private pullingExplanation() {
    return (
      timer(1000, 10000).pipe(
        switchMap(() =>
          this.service.getExplanation(this.requestId, this.modelVersionId)
        ),
        takeWhile(exp => exp.state !== 'SUCCESS', true)
      ),
      takeUntil(this.destroy.asObservable())
    );
  }
}
