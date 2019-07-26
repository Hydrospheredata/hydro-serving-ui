import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RootCauseEffects } from '@rootcause/state/root-cause.effects';
import { cold } from 'jasmine-marbles';
import { of, Observable, throwError } from 'rxjs';
import { RootCauseService } from '../services/root-cause.service';
import * as actions from './root-cause.actions';

const mockRootCauseService = {
  getExplanation: () => of({ precision: 1, coverage: 1, explanation: [] }),
};

fdescribe('RootCause effects', () => {
  let effects: RootCauseEffects;
  let actions$: Observable<any>;
  let service: RootCauseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RootCauseService, useValue: mockRootCauseService },
        RootCauseEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(RootCauseEffects);
    service = TestBed.get(RootCauseService);
  });

  describe('getExplanation effect', () => {
    it('with SUCCESS return right action', () => {
      const s = spyOn(service, 'getExplanation').and.callThrough();
      const action = actions.GetExplanation({
        requestBody: {
          model: { name: '1', version: '1' },
          explained_instance: '',
        },
      });

      const completed = actions.GetExplanationSuccess({
        explanation: { precision: 1, coverage: 1, explanation: [] },
      });

      actions$ = cold('---a', { a: action });
      const expected$ = cold('---b', { b: completed });

      expect(effects.getExplanation$).toBeObservable(expected$);
      expect(s).toHaveBeenCalled();
    });

    it('with FAIL return right action', () => {
      const s = spyOn(service, 'getExplanation').and.callFake(() =>
        throwError('error')
      );
      const action = actions.GetExplanation({
        requestBody: {
          model: { name: '1', version: '1' },
          explained_instance: '',
        },
      });

      const completed = actions.GetExplanationFailed({
        error: 'error',
      });

      actions$ = cold('---a', { a: action });
      const expected$ = cold('---b', { b: completed });

      expect(effects.getExplanation$).toBeObservable(expected$);
      expect(s).toHaveBeenCalled();
    });
  });
});
