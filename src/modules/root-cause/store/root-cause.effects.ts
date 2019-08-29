import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { ExplanationJobStatus } from '@rootcause/interfaces';
import { of, timer } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  switchMap,
  mergeMap,
  takeWhile,
} from 'rxjs/operators';
import { RootCauseService } from '../services';
import * as fromFeature from './root-cause.actions';

@Injectable()
export class RootCauseEffects {
  @Effect()
  getAllStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFeature.GetStatuses),
      mergeMap(({ params }) =>
        this.rootCause.getAllStatuses(params).pipe(
          map(tasks =>
            fromFeature.GetStatusesSuccess({ uid: params.uid, tasks })
          ),
          catchError(error => {
            this.snackbar.showSnackbar({
              message: error,
              timeout: 5000,
              closeAfterTimeout: true,
            });
            return of(
              fromFeature.GetStatusesFailed({ uid: params.uid, error })
            );
          })
        )
      )
    )
  );

  @Effect()
  createExplanationTask$ = this.actions$.pipe(
    ofType(fromFeature.CreateExplanationTask),
    switchMap(({ uid, requestBody, method }) => {
      return this.rootCause
        .createExplanationTask({ requestBody, method })
        .pipe(
          map(taskId => {
            return fromFeature.CreateExplanationTaskSuccess({
              uid,
              taskId,
              method,
            });
          }),
          catchError(error => {
            this.snackbar.showSnackbar({
              message: error,
              timeout: 5000,
              closeAfterTimeout: true,
            });
            return of(
              fromFeature.CreateExplanationTaskFailed({
                uid,
                method,
                error,
              })
            );
          })
        );
    })
  );

  @Effect()
  queuedSuccess$ = this.actions$.pipe(
    ofType(fromFeature.CreateExplanationTaskSuccess),
    mergeMap(({ uid, taskId, method }) =>
      timer(0, 2000).pipe(
        exhaustMap(() =>
          this.rootCause.getJobStatus({ taskId, method }).pipe(
            map(response => {
              switch (response.state) {
                case ExplanationJobStatus.success:
                  return fromFeature.JobFinished({
                    uid,
                    result: response.result,
                    method,
                  });
                case ExplanationJobStatus.started:
                  return fromFeature.JobStarted({
                    uid,
                    progress: response.progress,
                    method,
                  });
                case ExplanationJobStatus.failure:
                  return fromFeature.JobFailed({
                    uid,
                    error: response.description,
                    method,
                  });
                default:
                  return fromFeature.JobPending({ uid, method });
              }
            }),
            catchError(error => {
              this.snackbar.showSnackbar({
                message: error,
                timeout: 5000,
                closeAfterTimeout: true,
              });
              return of(fromFeature.JobFailed({ uid, error, method }));
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
    ofType(fromFeature.GetResult, fromFeature.JobFinished),
    mergeMap(({ uid, result, method }) =>
      this.rootCause
        .getResult({
          result,
          method,
        })
        .pipe(
          map(explanation =>
            fromFeature.GetResultSuccess({
              uid,
              explanation,
              method,
            })
          ),
          catchError(error => {
            this.snackbar.showSnackbar({
              message: error,
              timeout: 5000,
              closeAfterTimeout: true,
            });
            return of(
              fromFeature.GetResultFailed({ uid, error, method })
            );
          })
        )
    )
  );

  constructor(
    private actions$: Actions,
    private rootCause: RootCauseService,
    private snackbar: MdlSnackbarService
  ) {}
}
