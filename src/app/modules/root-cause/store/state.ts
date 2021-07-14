import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, map, distinctUntilChanged } from 'rxjs/operators';
import { Explanation } from '../models';

interface State {
  explanation: Explanation | null;
}

const initialState: State = {
  explanation: null,
};

@Injectable()
export class RootCauseState {
  private state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState,
  );

  constructor() {
    this.state$ = this.state.asObservable().pipe(shareReplay(1));
  }

  getExplanation(): Observable<Explanation | null> {
    return this.state$.pipe(
      map(({ explanation }) => explanation),
      distinctUntilChanged(),
    );
  }

  setExplanation(explanation: Explanation) {
    const state = this.state.getValue();
    this.state.next({ ...state, explanation });
  }
}
