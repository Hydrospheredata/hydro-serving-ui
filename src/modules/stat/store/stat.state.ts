import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Stat } from '../models';

interface State {
  loading: boolean;
  error: string | null;
  stat: Stat | null;
}

const initialState: State = {
  loading: false,
  error: null,
  stat: null,
};

@Injectable()
export class StatState {
  private state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  constructor() {
    this.state$ = this.state.asObservable();
  }

  getStat(): Observable<Stat | null> {
    return this.state$.pipe(
      map(({ stat }) => stat),
      distinctUntilChanged()
    );
  }

  isLoading(): Observable<boolean> {
    return this.state$.pipe(
      map(({ loading }) => loading),
      distinctUntilChanged()
    );
  }

  getError(): Observable<string | null> {
    return this.state$.pipe(
      map(({ error }) => error),
      distinctUntilChanged()
    );
  }

  setLoading(loading: boolean): void {
    const state = this.state.getValue();
    this.state.next({ ...state, loading });
  }

  setError(error: string | null): void {
    const state = this.state.getValue();
    this.state.next({ ...state, error });
  }

  setStat(stat: Stat): void {
    const state = this.state.getValue();
    this.state.next({ ...state, stat });
  }
}
