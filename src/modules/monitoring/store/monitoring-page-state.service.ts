import { Injectable } from '@angular/core';
import { Aggregation, CheckCollection } from '@monitoring/models';
import { BehaviorSubject, Observable } from '@node_modules/rxjs';
import {
  distinctUntilChanged,
  tap,
  shareReplay,
} from '@node_modules/rxjs/operators';
import { log } from '@shared/utils';
import { map } from 'rxjs/operators';

interface State {
  aggregation: Aggregation;
  error: string;
  checksLoading: boolean;
  checks: CheckCollection;
}

const initialState: State = {
  aggregation: undefined,
  error: undefined,
  checksLoading: false,
  checks: undefined,
};

@Injectable()
export class MonitoringPageState {
  state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  constructor() {
    console.log('create');
    this.state$ = this.state.asObservable().pipe(log, shareReplay(1));
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

  getChecks(): Observable<CheckCollection | undefined> {
    return this.state$.pipe(
      tap(_ => {
        console.log('bbb', _);
      }),
      map(({ checks }) => checks),
      distinctUntilChanged(),
      tap(_ => console.log('ffff', _))
    );
  }

  getAggregation(): Observable<Aggregation | undefined> {
    return this.state$.pipe(
      map(({ aggregation }) => aggregation),
      distinctUntilChanged(),
      tap(_ => console.log('new selected'))
    );
  }

  getError(): Observable<string | undefined> {
    return this.state$.pipe(
      map(({ error }) => error),
      distinctUntilChanged()
    );
  }

  setError(error: string): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, error, checksLoading: false });
  }

  selectAggregation(aggregation: Aggregation | undefined): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, aggregation });
  }

  addChecks(checks: CheckCollection): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, checks, checksLoading: false });
  }

  setChecksLoading(loading: boolean): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, checksLoading: loading });
  }
}
