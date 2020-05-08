import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { EXPLANATION, ExplanationDialogComponent } from '@rootcause/containers';
import { ExplanationFacade } from '@rootcause/containers/explanation/explanation.facade';
import { Explanation } from '@rootcause/models';
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
  switchMap,
  takeUntil,
  takeWhile,
  exhaustMap,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'hs-explanation',
  templateUrl: './explanation.component.html',
  viewProviders: [ExplanationFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationComponent implements OnChanges, OnDestroy {
  @Input() requestId: string;
  @Input() modelVersionId: number;

  explanation$: Observable<Explanation>;
  getExplanationCommand: Subject<any> = new Subject<any>();

  private destroy: Subject<any> = new Subject<any>();
  private inputChanged: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  constructor(
    private readonly facade: ExplanationFacade,
    private readonly dialogService: DialogService
  ) {
    this.getExplanationCommand
      .asObservable()
      .pipe(
        switchMap(() => {
          return this.facade.createExplanation(
            this.modelVersionId,
            this.requestId
          );
        }),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe();

    this.explanation$ = merge(this.inputChanged.asObservable()).pipe(
      switchMap(() =>
        this.facade.getExplanation(this.requestId, this.modelVersionId).pipe(
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
                  return this.startPolling();
                }),
                startWith(explanation)
              );
            } else {
              return this.startPolling();
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

  private startPolling(): Observable<Explanation> {
    return timer(1000, 10000).pipe(
      exhaustMap(() =>
        this.facade.getExplanation(this.requestId, this.modelVersionId)
      ),
      takeWhile(exp => exp.state !== 'SUCCESS', true),
      takeUntil(this.destroy)
    );
  }
}
