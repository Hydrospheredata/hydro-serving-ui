import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { ExplanationJobStatus } from '@rootcause/models';
import { ExplanationJobBuilder } from '@rootcause/services/explanation-job.builder';
import { of, interval } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  switchMap,
  mergeMap,
  takeWhile,
} from 'rxjs/operators';
import { RootCauseService, ExplanationBuilder } from '../services';
import * as rootCauseActions from './root-cause.actions';

@Injectable()
export class RootCauseEffects {
  @Effect()
  getStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rootCauseActions.GetStatus),
      mergeMap(body => this.rootCause.getStatus(body).pipe(
        map( result => rootCauseActions.GetStatusSuccess({ result })),
        catchError(error => {
          this.snackbar.showSnackbar({
            message: error,
            timeout: 5000,
            closeAfterTimeout: true,
          });
          return of(rootCauseActions.GetStatusFailed({ error }));
        })
      ))
    )
  );

  @Effect()
  getExplanation$ = this.actions$.pipe(
    ofType(rootCauseActions.QueueExplanation),
    switchMap(({ uid, requestBody, explanationType }) => {
      return this.rootCause.queueExplanation(requestBody, explanationType).pipe(
        map(jobId => {
          return rootCauseActions.QueueExplanationSuccess({
            job: this.builder.build({
              uid,
              jobId,
              explanationType,
            }),
          });
        }),
        catchError(error => {
          this.snackbar.showSnackbar({
            message: error,
            timeout: 5000,
            closeAfterTimeout: true,
          });
          return of(rootCauseActions.QueueExplanationFailed({ uid, error }));
        })
      );
    })
  );

  @Effect()
  queuedSuccess$ = this.actions$.pipe(
    ofType(rootCauseActions.QueueExplanationSuccess),
    mergeMap(({ job: { uid, jobId, explanationType } }) =>
      interval(2000).pipe(
        exhaustMap(() =>
          this.rootCause.getJobStatus(jobId, explanationType).pipe(
            map(response => {
              switch (response.state) {
                case ExplanationJobStatus.success:
                  return rootCauseActions.JobFinished({
                    uid,
                    resultId: response.result,
                    explanationType,
                  });
                case ExplanationJobStatus.started:
                  return rootCauseActions.JobStarted({
                    uid,
                    progress: response.progress,
                  });
                case ExplanationJobStatus.failure:
                  return rootCauseActions.JobFailed({
                    uid,
                    error: response.description,
                  });
                default:
                  return rootCauseActions.JobPending({ uid });
              }
            }),
            catchError(error => {
              this.snackbar.showSnackbar({
                message: error,
                timeout: 5000,
                closeAfterTimeout: true,
              });
              return of(rootCauseActions.JobFailed({ uid, error }));
            })
          )
        ),
        takeWhile(
          _ =>
            _.type !== '[Root cause] job failed' &&
            _.type !== '[Root cause] job finished',
          true
        )
      )
    )
  );

  @Effect()
  getResult$ = this.actions$.pipe(
    ofType(rootCauseActions.JobFinished),
    mergeMap(({ uid, resultId, explanationType }) =>
      this.rootCause.getResult(resultId, explanationType).pipe(
        map(_ =>
          rootCauseActions.GetResultSuccess({
            uid,
            explanation: this.explanationBuilder.build(_),
          })
        ),
        catchError(error => {
          this.snackbar.showSnackbar({
            message: error,
            timeout: 5000,
            closeAfterTimeout: true,
          });
          return of(rootCauseActions.GetResultFailed({ uid, error }));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private rootCause: RootCauseService,
    private builder: ExplanationJobBuilder,
    private explanationBuilder: ExplanationBuilder,
    private snackbar: MdlSnackbarService
  ) {}
}
