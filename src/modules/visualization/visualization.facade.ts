import { Injectable, OnDestroy } from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { Colorizer, ColorizerFabric } from '@core/models';
import { ModelsFacade } from '@models/store';
import { Check } from '@monitoring/models';
import { MonitoringService } from '@monitoring/services';
import { neitherNullNorUndefined } from '@shared/utils';
import { Observable, of, Subject, timer } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { VisualizationResponse, ETaskState } from './models/visualization';
import { VisualizationApi } from './services';
import { VisualizationState } from './store/visualization.state';

export type ColorBy = 'class_label' | 'metric';

@Injectable()
export class VisualizationFacade implements OnDestroy {
  private readonly colors$: Observable<string[]>;
  private readonly selectedCheck$: Observable<Check>;

  private destroy: Subject<any> = new Subject<any>();

  constructor(
    private api: VisualizationApi,
    private monitoringApi: MonitoringService,
    private modelsFacade: ModelsFacade,
    private colorizerFabric: ColorizerFabric,
    private state: VisualizationState
  ) {
    this.colors$ = this.getSelectedColorizer().pipe(
      neitherNullNorUndefined,
      map(colorizer => colorizer.getColors()),
      startWith([]),
      shareReplay(1)
    );

    this.selectedCheck$ = this.getSelectedId().pipe(
      neitherNullNorUndefined,
      switchMap(id => this.monitoringApi.getCheck(id)),
      map(bareCheck => new Check(bareCheck)),
      shareReplay(1)
    );

    this.getTaskId()
      .pipe(
        neitherNullNorUndefined,
        switchMap(taskId => {
          return timer(0, 5000).pipe(
            exhaustMap(() => {
              return this.api.getJobResult(taskId);
            }),
            tap(task => {
              this.state.setResult({
                message: task.message,
                status: task.state,
                result: task.result,
                colorizers: task.result
                  ? this.buildColorizers(task.result)
                  : [],
                top100: task.result ? task.result.top_N : [],
                counterfactuals: task.result ? task.result.counterfactuals : [],
                visualizationMetrics: task.result
                  ? task.result.visualization_metrics
                  : undefined,
                requestsIds: task.result ? task.result.requests_ids : [],
              });
            }),
            takeWhile(({ state }) => state !== ETaskState.success),
            catchError(err => {
              this.state.setError(err);
              return of();
            })
          );
        }),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe();
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
      map(([index, ids]) => ids[index])
    );
  }

  getModelVersion() {
    return this.modelsFacade.selectedModelVersion$;
  }

  getError() {
    return this.state.getError();
  }

  getScatterPlotData(): Observable<ScatterPlotData> {
    return this.getResult().pipe(
      filter(val => !!val),
      map(({ data }) => {
        return data.reduce(
          ({ points, minX, maxX, minY, maxY }, [x, y]) => {
            const point: ScatterPlotPoint = { x, y };
            const newPoints = [...points, point];
            return {
              points: newPoints,
              minX: x < minX ? x : minX,
              maxX: x > maxX ? x : maxX,
              minY: y < minY ? y : minY,
              maxY: y > maxY ? y : maxY,
            };
          },
          {
            points: [],
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
          }
        );
      })
    );
  }

  getColors() {
    return this.colors$;
  }

  getSelectedCheck() {
    return this.selectedCheck$;
  }

  loadEmbedding(): void {
    this.modelsFacade.selectedModelVersion$
      .pipe(
        switchMap(mv =>
          this.api.createTask('umap', mv).pipe(
            tap(task => {
              this.state.setTaskId(task.task_id);
            }),
            catchError(err => {
              this.state.setError(err);
              return of();
            })
          )
        ),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe();
  }

  changeColorizer(colorizer: Colorizer): void {
    this.state.setColorizer(colorizer);
  }

  changeSelectedPointIndex(index: number): void {
    this.state.selectIndex(index);
  }

  private buildColorizers({
    class_labels,
    metrics,
  }: VisualizationResponse): Colorizer[] {
    const res = [];
    for (const [name, payload] of Object.entries(class_labels)) {
      res.push(
        this.colorizerFabric.createColorizer('class_label', {
          name,
          data: payload.data,
          coloringType: payload.coloring_type,
          classes: payload.classes,
        })
      );
    }

    for (const [name, payload] of Object.entries(metrics)) {
      res.push(
        this.colorizerFabric.createColorizer('metric', {
          name,
          data: payload.scores,
          metric: payload,
        })
      );
    }
    return res;
  }
}
