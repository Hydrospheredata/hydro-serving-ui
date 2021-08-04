import { Injectable, OnDestroy } from '@angular/core';
import { SnackbarService } from '@app/core/snackbar.service';

import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { ModelVersion } from '@app/core/data/types';

import { ScatterPlotData } from '../visualization/models/scatter-plot-data.model';
import { Colorizer, ColorizerFabric } from '../visualization/models';

import { Check } from '../monitoring/models';
import { MonitoringService } from '../monitoring/services';

import { neitherNullNorUndefined } from '@app/utils';
import { Observable, of, Subject, timer, concat } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { VisualizationParams } from './models';
import { VisualizationResponse, ETaskState } from './models/visualization';
import { VisualizationApi } from './services';
import { VisualizationState } from './store/visualization.state';
import * as R from 'ramda';
import * as D3 from 'd3';
import { Notify } from '@app/core/store/actions/notifications.actions';

export type ColorBy = 'class_label' | 'metric';

@Injectable()
export class VisualizationFacade implements OnDestroy {
  private readonly colors$: Observable<string[]>;
  private readonly selectedCheck$: Observable<Check>;

  private destroy: Subject<any> = new Subject<any>();

  constructor(
    private api: VisualizationApi,
    private monitoringApi: MonitoringService,
    private modelVersionsFacade: ModelVersionsFacade,
    private colorizerFabric: ColorizerFabric,
    private state: VisualizationState,
    private snackbar: SnackbarService,
  ) {
    this.colors$ = this.getSelectedColorizer().pipe(
      neitherNullNorUndefined,
      map(colorizer => colorizer.getColors()),
      startWith([]),
      shareReplay(1),
    );

    this.selectedCheck$ = this.getSelectedId().pipe(
      neitherNullNorUndefined,
      switchMap(id => this.monitoringApi.getCheck(id)),
      map(bareCheck => new Check(bareCheck)),
      shareReplay(1),
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = null;
  }

  getStatus() {
    return this.state.getStatus();
  }

  getTaskId() {
    return this.state.getTaskId();
  }

  getResult() {
    return this.state.getResult();
  }

  getColorizers() {
    return this.state.getColorizers();
  }

  getSelectedColorizer() {
    return this.state.getSelectedColorizer();
  }

  getSelectedPointIndex() {
    return this.state.getSelectedPointIndex();
  }

  getTop100() {
    return this.state.getTop100();
  }

  getCounterfactuals() {
    return this.state.getCounterfactuals();
  }

  getVisualizationMetrics() {
    return this.state.getVisualizationMetrics();
  }

  getRequestsIds() {
    return this.state.getRequestsIds();
  }

  getMessage() {
    return this.state.getMessage();
  }

  getSelectedId() {
    return this.getSelectedPointIndex().pipe(
      withLatestFrom(this.getRequestsIds()),
      map(([index, ids]) => ids[index]),
    );
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.modelVersionsFacade.selectedModelVersion();
  }

  getError(): Observable<string> {
    return this.state.getError();
  }

  getParams(): Observable<VisualizationParams> {
    return this.state.getParams();
  }

  getScatterPlotData(): Observable<ScatterPlotData> {
    return this.getResult().pipe(
      neitherNullNorUndefined,
      map(({ data = [], training_data = [] }) => {
        const getXCoordinates = R.compose(R.map(R.head));
        const getYCoordinates = R.compose(R.flatten, R.map(R.tail));
        const toScatterPlotPoint = el => {
          return {
            x: el[0],
            y: el[1],
          };
        };

        const prodXCoordinates: number[] = getXCoordinates(data);
        const trainXCoordinates: number[] = getXCoordinates(training_data);

        const prodYCoordinates: number[] = getYCoordinates(data);
        const trainYCoordinates: number[] = getYCoordinates(training_data);

        const [minX, maxX] = D3.extent(
          R.concat(prodXCoordinates, trainXCoordinates),
        );
        const [minY, maxY] = D3.extent(
          R.concat(prodYCoordinates, trainYCoordinates),
        );

        return {
          points: data.map(toScatterPlotPoint),
          trainingPoints: training_data.map(toScatterPlotPoint),
          minX,
          maxX,
          minY,
          maxY,
        };
      }),
    );
  }

  getColors() {
    return this.colors$;
  }

  getSelectedCheck() {
    return this.selectedCheck$;
  }

  loadEmbedding(): void {
    this.getModelVersion()
      .pipe(
        switchMap(mv =>
          this.api.createTask('umap', mv).pipe(
            switchMap(({ task_id }) => {
              return concat(
                timer(0, 5000).pipe(
                  switchMap(() => this.api.getJobResult(task_id)),
                  tap(task => {
                    this.state.setResult({
                      message: task.message,
                      status: task.state,
                      result: task.result,
                      colorizers: task.result
                        ? this.buildColorizers(task.result)
                        : [],
                      top100: task.result ? task.result.top_N : [],
                      counterfactuals: task.result
                        ? task.result.counterfactuals
                        : [],
                      visualizationMetrics: task.result
                        ? task.result.visualization_metrics
                        : undefined,
                      requestsIds: task.result ? task.result.requests_ids : [],
                    });
                  }),
                  takeWhile(({ state }) => state !== ETaskState.success),
                  catchError(err => {
                    this.state.setError(err);
                    return of(
                      Notify({
                        kind: 'error',
                        message: err,
                      }),
                    );
                  }),
                ),
                this.getModelVersion().pipe(
                  switchMap(mv => this.api.getParams(mv.id)),
                  tap(params => {
                    this.state.setParams(params);
                  }),
                ),
              );
            }),
            catchError(err => {
              this.state.setError(err);
              return of();
            }),
          ),
        ),
        takeUntil(this.destroy.asObservable()),
      )
      .subscribe();
  }

  changeColorizer(colorizer: Colorizer): void {
    this.state.setColorizer(colorizer);
  }

  changeSelectedPointIndex(index: number): void {
    this.state.selectIndex(index);
  }

  refit(visParams: VisualizationParams): void {
    this.getModelVersion()
      .pipe(
        switchMap(mv => {
          return this.api.setParams(visParams, mv).pipe(
            tap(() => {
              this.loadEmbedding();
            }),
            catchError(err => {
              return of(Notify({ kind: 'error', message: err }));
            }),
          );
        }),
      )
      .subscribe();
  }

  private buildColorizers({
    output_info,
    metrics,
  }: VisualizationResponse): Colorizer[] {
    const res = [];
    for (const [name, payload] of Object.entries(output_info)) {
      res.push(
        this.colorizerFabric.createColorizer('class_label', {
          name,
          data: payload.data,
          coloringType: payload.coloring_type,
          classes: payload.classes,
        }),
      );
    }

    for (const [name, payload] of Object.entries(metrics)) {
      res.push(
        this.colorizerFabric.createColorizer('metric', {
          name,
          data: payload.scores,
          metric: payload,
        }),
      );
    }
    return res;
  }
}
