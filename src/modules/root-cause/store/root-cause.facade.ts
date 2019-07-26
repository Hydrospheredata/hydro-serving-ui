import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExplanationRequestBody } from '@rootcause/interfaces';
import { GetExplanation } from './root-cause.actions';
import { State } from './root-cause.reducer';
import * as rootCauseSelectors from './root-cause.selectors';

@Injectable()
export class RootCauseFacade {
  explanation$ = this.store.select(rootCauseSelectors.getExplanation);
  isLoading$ = this.store.select(rootCauseSelectors.isLoading);
  error$ = this.store.select(rootCauseSelectors.getError);

  constructor(private store: Store<State>) {}

  getExplanation(requestBody: ExplanationRequestBody): void {
    this.store.dispatch(GetExplanation({ requestBody }));
  }
}
