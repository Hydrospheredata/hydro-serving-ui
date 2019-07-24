import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RootCauseEffects } from '@rootcause/state/root-cause.effects';
import { cold, hot } from 'jasmine-marbles';
import { of, Observable } from 'rxjs';
import { RootCauseService } from '../services/root-cause.service';
import * as actions from './root-cause.actions';

const mockRootCauseService = {
  getExplanation: () => of({ precision: 1, coverage: 1, explanation: [] }),
};

fdescribe('RootCause effects', () => {
  let effects: RootCauseEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RootCauseService, useValue: mockRootCauseService },
        RootCauseEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(RootCauseEffects);
  });

  describe('getExplanation effect', () => {
    it('with SUCCESS return right action', () => {
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
    });
  });
});
