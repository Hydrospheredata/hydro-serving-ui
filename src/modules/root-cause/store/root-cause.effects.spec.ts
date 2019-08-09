import { MdlSnackbarService } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ExplanationJobBuilder, ExplanationBuilder } from '@rootcause/services';
import { RootCauseEffects } from '@rootcause/store/root-cause.effects';
import { cold } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';
import { RootCauseService } from '../services/root-cause.service';
import * as actions from './root-cause.actions';

const mockRootCauseService = {
  queueExplanation: () => of('job_id'),
};

const mockSnackbarService = {
  showSnackbar: ({ message, timeout, closeAfterTimeout }) => {},
};

describe('RootCause effects', () => {
  let effects: RootCauseEffects;
  let actions$: Observable<any>;
  let rootCauseService: RootCauseService;
  let jobBuilder: ExplanationJobBuilder;
  let snackbar: MdlSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlSelectModule.forRoot()],
      providers: [
        ExplanationJobBuilder,
        ExplanationBuilder,
        { provide: RootCauseService, useValue: mockRootCauseService },
        RootCauseEffects,
        provideMockActions(() => actions$),
        { provide: MdlSnackbarService, useValue: mockSnackbarService },
      ],
    });

    effects = TestBed.get(RootCauseEffects);
    rootCauseService = TestBed.get(RootCauseService);
    jobBuilder = TestBed.get(ExplanationJobBuilder);
    snackbar = TestBed.get(MdlSnackbarService);
  });

  describe('getExplanation effect', () => {
    it('with SUCCESS return right action', () => {
      const s = spyOn(rootCauseService, 'queueExplanation').and.callThrough();
      const action = actions.QueueExplanation({
        explanationType: 'rise',
        uid: '1',
        requestBody: {
          model: { name: '1', version: 1 },
          explained_instance: {
            uid: 1,
            timestamp: 1,
          },
        },
      });

      const completed = actions.QueueExplanationSuccess({
        job: jobBuilder.build({
          uid: '1',
          jobId: 'job_id',
          explanationType: 'rise',
        }),
      });

      actions$ = cold('---a', { a: action });
      const expected$ = cold('---b', { b: completed });

      expect(effects.getExplanation$).toBeObservable(expected$);
      expect(s).toHaveBeenCalled();
    });

    it('with FAIL return right action', () => {
      const rcSpy = spyOn(rootCauseService, 'queueExplanation').and.callFake(
        () => throwError('error')
      );
      const snackbarSpy = spyOn(snackbar, 'showSnackbar').and.callThrough();

      const action = actions.QueueExplanation({
        explanationType: 'rise',
        uid: '1',
        requestBody: {
          model: { name: '1', version: 1 },
          explained_instance: {
            uid: 1,
            timestamp: 1,
          },
        },
      });

      const completed = actions.QueueExplanationFailed({
        uid: '1',
        error: 'error',
      });

      actions$ = cold('---a', { a: action });
      const expected$ = cold('---b', { b: completed });

      expect(effects.getExplanation$).toBeObservable(expected$);
      expect(rcSpy).toHaveBeenCalled();
      expect(snackbarSpy).toHaveBeenCalledWith({
        message: 'error',
        timeout: 5000,
        closeAfterTimeout: true,
      });
    });
  });
});
