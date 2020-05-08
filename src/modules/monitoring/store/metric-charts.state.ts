import { Injectable } from '@node_modules/@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ModelVersion } from '@shared/models';

interface State {
  modelVersionsToCompare: ModelVersion[];
}

const initialState: State = {
  modelVersionsToCompare: [],
};

@Injectable()
export class MetricChartsState {
  private state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );
  constructor() {
    this.state$ = this.state.asObservable();
  }

  addModelVersionToCompare(modelVersions: ModelVersion[]): void {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, modelVersionsToCompare: modelVersions });
  }

  getModelVersionsToCompare(): Observable<ModelVersion[]> {
    return this.state$.pipe(
      map(({ modelVersionsToCompare }) => modelVersionsToCompare),
      distinctUntilChanged()
    );
  }
}
