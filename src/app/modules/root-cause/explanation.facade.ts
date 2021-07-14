import { Injectable, OnDestroy } from '@angular/core';
import { SnackbarService } from '@app/core/snackbar.service';
import { Explanation, ExplanationStatus } from './models';
import { RootCauseApiService } from './services';
import { RootCauseState } from './store/state';
import { merge, Observable, of, Subject, timer } from 'rxjs';
import {
  catchError,
  debounceTime,
  exhaustMap,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';

@Injectable()
export class ExplanationFacade implements OnDestroy {
  private stopPoll$: Subject<any> = new Subject<any>();
  private destroy$: Subject<any> = new Subject<any>();
  private readonly pollingInterval = 5000;

  constructor(
    private readonly state: RootCauseState,
    private readonly api: RootCauseApiService,
    private readonly snackbar: SnackbarService,
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createExplanation(
    model_version_id,
    explained_request_id,
    method = 'anchor',
    output_field,
  ): void {
    this.api
      .createExplanation({
        explained_request_id,
        method,
        model_version_id: model_version_id,
        output_field,
      })
      .pipe(
        switchMap(() =>
          this.poll(model_version_id, explained_request_id, output_field),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(
        explanation => this.state.setExplanation(explanation),
        error => {
          console.error(error);
          this.state.setExplanation({
            state: ExplanationStatus.failed,
            description: `Internal error was occurred`,
          });
        },
      );
  }

  getExplanation(): Observable<Explanation | null> {
    return this.state.getExplanation();
  }

  loadExplanation(
    requestId,
    modelVersionId,
    method = 'anchor',
    output_field,
  ): void {
    this.api
      .getExplanation({
        explained_request_id: requestId,
        method,
        model_version_id: modelVersionId,
        output_field,
      })
      .pipe(
        tap(_ => this.stopPoll$.next()),
        switchMap(explanation => {
          switch (explanation.state) {
            case ExplanationStatus.failed:
            case ExplanationStatus.notCalled:
            case ExplanationStatus.success:
            case ExplanationStatus.notSupported:
              return of(explanation);
            default:
              return this.poll(modelVersionId, requestId, output_field);
          }
        }),
        catchError(err =>
          of<Explanation>({
            state: ExplanationStatus.failed,
            description: `Internal error was occurred`,
          }),
        ),
      )
      .subscribe(
        explanation => this.state.setExplanation(explanation),
        error => {
          console.error(error);
          this.state.setExplanation({
            state: ExplanationStatus.failed,
            description: `Internal error was occurred`,
          });
        },
      );
  }

  private poll(model_version_id, explained_request_id, output_field) {
    return timer(0, this.pollingInterval).pipe(
      debounceTime(this.pollingInterval / 2),
      exhaustMap(() =>
        this.api.getExplanation({
          model_version_id,
          explained_request_id,
          method: 'anchor',
          output_field,
        }),
      ),
      takeWhile(exp => exp.state !== ExplanationStatus.success, true),
      takeUntil(merge(this.destroy$, this.stopPoll$)),
    );
  }
}
