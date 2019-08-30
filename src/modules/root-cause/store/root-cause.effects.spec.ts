import { MdlSnackbarService } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RootCauseEffects } from '@rootcause/store/root-cause.effects';
import { cold } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';
import { RootCauseService } from '../services/root-cause.service';
import * as actions from './root-cause.actions';

const mockRootCauseService = {
  createExplanationTask: () => of('task_id'),
};

const mockSnackbarService = {
  showSnackbar: ({ message, timeout, closeAfterTimeout }) => {},
};

describe('RootCause effects', () => {
  let effects: RootCauseEffects;
  let actions$: Observable<any>;
  let rootCauseService: RootCauseService;
  let snackbar: MdlSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlSelectModule.forRoot()],
      providers: [
        { provide: RootCauseService, useValue: mockRootCauseService },
        RootCauseEffects,
        provideMockActions(() => actions$),
        { provide: MdlSnackbarService, useValue: mockSnackbarService },
      ],
    });

    effects = TestBed.get(RootCauseEffects);
    rootCauseService = TestBed.get(RootCauseService);
    snackbar = TestBed.get(MdlSnackbarService);
  });

  describe('getExplanation effect', () => {
    it('with SUCCESS return right action', () => {
      const s = spyOn(rootCauseService, 'createExplanationTask').and.callThrough();
      const action = actions.CreateExplanationTask({
        method: 'rise',
        uid: '1',
        requestBody: {
          model: { name: '1', version: 1 },
          explained_instance: {
            uid: 1,
            timestamp: 1,
          },
        },
      });

      const completed = actions.CreateExplanationTaskSuccess({
          uid: '1',
          taskId: 'task_id',
          method: 'rise',
      });

      actions$ = cold('---a', { a: action });
      const expected$ = cold('---b', { b: completed });

      expect(effects.createExplanationTask$).toBeObservable(expected$);
      expect(s).toHaveBeenCalled();
    });

    it('with FAIL return right action', () => {
      const rcSpy = spyOn(rootCauseService, 'createExplanationTask').and.callFake(
        () => throwError('error')
      );
      const snackbarSpy = spyOn(snackbar, 'showSnackbar').and.callThrough();

      const action = actions.CreateExplanationTask({
        method: 'rise',
        uid: '1',
        requestBody: {
          model: { name: '1', version: 1 },
          explained_instance: {
            uid: 1,
            timestamp: 1,
          },
        },
      });

      const completed = actions.CreateExplanationTaskFailed({
        uid: '1',
        error: 'error',
        method: 'rise',
      });

      actions$ = cold('---a', { a: action });
      const expected$ = cold('---b', { b: completed });

      expect(effects.createExplanationTask$).toBeObservable(expected$);
      expect(rcSpy).toHaveBeenCalled();
      expect(snackbarSpy).toHaveBeenCalledWith({
        message: 'error',
        timeout: 5000,
        closeAfterTimeout: true,
      });
    });
  });
});
