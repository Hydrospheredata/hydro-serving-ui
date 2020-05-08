import { Injectable } from '@angular/core';
import { Aggregation, CheckCollection } from '@monitoring/models';
import { BehaviorSubject, Observable } from '@node_modules/rxjs';
import { distinctUntilChanged } from '@node_modules/rxjs/operators';
import { map } from 'rxjs/operators';

interface State {
  aggregation: Aggregation | null;
  error: string | null;
  checksLoading: boolean;
  checks: CheckCollection | null;
}

const initialState: State = {
  aggregation: null,
  error: null,
  checksLoading: false,
  checks: null,
};

@Injectable()
export class MonitoringPageState {
  private readonly state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  constructor() {
    this.state$ = this.state.asObservable();
  }

  getState(): Observable<State> {
    return this.state$;
  }

  isChecksLoading(): Observable<boolean> {
    return this.state$.pipe(
      map(({ checksLoading }) => checksLoading),
      distinctUntilChanged()
    );
  }

  getChecks(): Observable<CheckCollection | null> {
    return this.state$.pipe(
      map(({ checks }) => checks),
      distinctUntilChanged()
    );
  }

  getAggregation(): Observable<Aggregation | null> {
    return this.state$.pipe(
      map(({ aggregation }) => aggregation),
      distinctUntilChanged()
    );
  }

  getError(): Observable<string | null> {
    return this.state$.pipe(
      map(({ error }) => error),
      distinctUntilChanged()
    );
  }

  setError(error: string): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, error });
  }

  selectAggregation(aggregation: Aggregation | null): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, aggregation });
  }

  addChecks(checks: CheckCollection): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, checks });
  }

  setChecksLoading(loading: boolean): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, checksLoading: loading });
  }
}
