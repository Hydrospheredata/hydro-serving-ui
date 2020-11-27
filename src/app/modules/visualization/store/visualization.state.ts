import { Colorizer } from '../models';
import { Injectable } from '@node_modules/@angular/core';
import { BehaviorSubject, Observable } from '@node_modules/rxjs';
import { shareReplay } from '@node_modules/rxjs/internal/operators';
import { pluck } from '@app/utils';
import { VisualizationResponse, ETaskState } from '../models';
import { VisualizationParams } from '../models/visualization-params';
import { ColorBy } from '../visualization.facade';

export type VisualizationTaskId = string;
export interface State {
  taskId: VisualizationTaskId | null;
  result: VisualizationResponse | null;
  error: string | null;
  status: ETaskState;
  colorBy: ColorBy;
  colorizers: Colorizer[];
  selectedColorizer: Colorizer;
  selectedPointIndex: number;
  data: number[];
  top100: number[][];
  counterfactuals: number[][];
  visualizationMetrics: { [name: string]: string };
  requestsIds: string[];
  message: string | null;
  params: VisualizationParams;
}

const initialState: State = {
  taskId: null,
  result: null,
  error: null,
  status: ETaskState.unknown,
  colorBy: 'class_label',
  colorizers: [],
  selectedColorizer: undefined,
  data: [],
  selectedPointIndex: undefined,
  top100: [],
  counterfactuals: [],
  visualizationMetrics: undefined,
  requestsIds: [],
  message: null,
  params: null,
};

@Injectable()
export class VisualizationState {
  private state$: Observable<State>;
  private state: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );

  constructor() {
    this.state$ = this.state.asObservable().pipe(shareReplay(1));
  }

  public getStatus() {
    return this.state$.pipe(pluck('status'));
  }

  public getTaskId() {
    return this.state$.pipe(pluck('taskId'));
  }

  public getResult() {
    return this.state$.pipe(pluck('result'));
  }

  public getError() {
    return this.state$.pipe(pluck('error'));
  }

  public getColorizers() {
    return this.state$.pipe(pluck('colorizers'));
  }

  public getSelectedColorizer() {
    return this.state$.pipe(pluck('selectedColorizer'));
  }

  public getSelectedPointIndex() {
    return this.state$.pipe(pluck('selectedPointIndex'));
  }

  public getTop100() {
    return this.state$.pipe(pluck('top100'));
  }

  public getCounterfactuals() {
    return this.state$.pipe(pluck('counterfactuals'));
  }

  public getVisualizationMetrics() {
    return this.state$.pipe(pluck('visualizationMetrics'));
  }

  public getRequestsIds() {
    return this.state$.pipe(pluck('requestsIds'));
  }

  public getMessage() {
    return this.state$.pipe(pluck('message'));
  }

  public getParams(): Observable<VisualizationParams> {
    return this.state$.pipe(pluck('params'));
  }

  public setError(error: string | null): void {
    const state = this.state.getValue();
    this.state.next({ ...state, error, status: ETaskState.failed });
  }

  public setTaskId(taskId: string | null): void {
    const state = this.state.getValue();
    this.state.next({ ...state, taskId });
  }

  public setColorizer(selectedColorizer: Colorizer): void {
    const state = this.state.getValue();
    this.state.next({ ...state, selectedColorizer });
  }

  public selectIndex(index: number | null): void {
    const state = this.state.getValue();
    this.state.next({ ...state, selectedPointIndex: index });
  }

  public setParams(params: VisualizationParams) {
    const state = this.state.getValue();
    this.state.next({ ...state, params });
  }

  public setResult(params: {
    status: ETaskState;
    result: VisualizationResponse;
    colorizers: Colorizer[];
    top100: number[][];
    counterfactuals: number[][];
    visualizationMetrics: any;
    requestsIds: string[];
    message: string;
  }): void {
    const state = this.state.getValue();
    this.state.next({ ...state, ...params });
  }
}
