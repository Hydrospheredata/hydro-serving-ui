import { Injectable } from '@angular/core';
import { AggregationsList } from '@monitoring/models';
import { BehaviorSubject, Observable } from '@node_modules/rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

interface State {
  groupedBy: number;
  loading: boolean;
  error: string | null;
  aggregations: AggregationsList | null;
  offset: number;
}

const initialState: State = {
  groupedBy: 10,
  loading: false,
  error: null,
  aggregations: null,
  offset: 0,
};

@Injectable()
export class AggregationState {
  private readonly state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  constructor() {
    this.state$ = this.state.asObservable();
  }

  getOffset(): Observable<number> {
    return this.state$.pipe(
      map(({ offset }) => offset),
      distinctUntilChanged()
    );
  }

  setOffset(offsetChange: number): void {
    const curState = this.state.getValue();
    this.state.next({ ...curState, offset: curState.offset + offsetChange });
  }

  getAggregations(): Observable<AggregationsList | null> {
    return this.state$.pipe(
      map(({ aggregations }) => aggregations),
      distinctUntilChanged()
    );
  }

  addAggregations(aggregations: AggregationsList): void {
    const curState = this.state.getValue();
    this.state.next({ ...curState, aggregations });
  }

  getError(): Observable<string | null> {
    return this.state$.pipe(
      map(({ error }) => error),
      distinctUntilChanged()
    );
  }

  setError(error: string): void {
    const curState = this.state.getValue();
    this.state.next({ ...curState, error });
  }
}
