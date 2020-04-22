import { Injectable, OnDestroy } from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { Colorizer, ColorizerFabric } from '@core/models';
import { ModelsFacade } from '@models/store';
import { Check } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { ModelVersion } from '@shared/_index';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { TaskState, VisualizationResponse } from './models/visualization';
import { VisualizationApi } from './services';

export type ColorBy = 'class_label' | 'metric';

export interface State {
  taskId: string;
  result: VisualizationResponse;
  error: string;
  status: TaskState;
  colorBy: ColorBy;
  colorizers: Colorizer[];
  selectedColorizer: Colorizer;
  selectedPointIndex: number;
  data: number[];
  top100: number[][];
  counterfactuals: number[][];
  visualizationMetrics: { [name: string]: string };
  requestsIds: string[];
}

const initialState: State = {
  taskId: undefined,
  result: undefined,
  error: undefined,
  status: 'PENDING',
  colorBy: 'class_label',
  colorizers: [],
  selectedColorizer: undefined,
  data: [],
  selectedPointIndex: undefined,
  top100: [],
  counterfactuals: [],
  visualizationMetrics: undefined,
  requestsIds: [],
};

@Injectable()
export class VisualizationFacade implements OnDestroy {
  state$: Observable<State>;
  taskId$: Observable<string>;
  status$: Observable<TaskState>;
  result$: Observable<VisualizationResponse>;
  error$: Observable<string | null>;
  selectedColorizer$: Observable<Colorizer>;
  selectedPointIndex$: Observable<number>;
  scatterPlotData$: Observable<ScatterPlotData>;
  colors$: Observable<string[]>;
  top100$: Observable<number[][]>;
  counterfactuals$: Observable<number[][]>;
  modelVersion$: Observable<ModelVersion>;
  selectedCheck$: Observable<Check>;
  colorizers$: Observable<Colorizer[]>;
  visualizationMetrics$: Observable<{ [name: string]: string }>;
  requestsIds$: Observable<string[]>;
  selectedId$: Observable<string>;

  private state: BehaviorSubject<State> = new BehaviorSubject(initialState);
  private createTask: Subject<any> = new Subject();
  private destroy: Subject<any> = new Subject<any>();

  constructor(
    private api: VisualizationApi,
    private monitoringApi: MonitoringService,
    private modelsFacade: ModelsFacade,
    private colorizerFabric: ColorizerFabric
  ) {
    // UI Inputs
    this.state$ = this.state.asObservable().pipe(shareReplay(1));
    this.status$ = this.state$.pipe(pluck('status'), distinctUntilChanged());
    this.taskId$ = this.state$.pipe(pluck('taskId'), distinctUntilChanged());
    this.result$ = this.state$.pipe(
      pluck('result'),
      distinctUntilChanged(),
      filter(val => !!val)
    );
    this.error$ = this.state$.pipe(pluck('error'), distinctUntilChanged());
    this.colorizers$ = this.state.pipe(
      pluck('colorizers'),
      distinctUntilChanged()
    );
    this.selectedColorizer$ = this.state.pipe(
      filter(val => val !== undefined),
      pluck('selectedColorizer'),
      distinctUntilChanged()
    );
    this.selectedPointIndex$ = this.state$.pipe(
      pluck('selectedPointIndex'),
      distinctUntilChanged()
    );
    this.top100$ = this.state$.pipe(pluck('top100'), distinctUntilChanged());
    this.counterfactuals$ = this.state$.pipe(
      pluck('counterfactuals'),
      distinctUntilChanged()
    );
    this.visualizationMetrics$ = this.state$.pipe(
      pluck('visualizationMetrics'),
      distinctUntilChanged()
    );
    this.requestsIds$ = this.state$.pipe(
      pluck('requestsIds'),
      distinctUntilChanged()
    );
    this.selectedId$ = combineLatest(
      this.requestsIds$,
      this.selectedPointIndex$
    ).pipe(map(([ids, index]) => ids[index]));
    this.scatterPlotData$ = this.result$.pipe(
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

    this.colors$ = this.selectedColorizer$.pipe(
      filter(val => !!val),
      map(colorizer => colorizer.getColors()),
      startWith([]),
      shareReplay(1)
    );
    this.modelVersion$ = this.modelsFacade.selectedModelVersion$;
    this.selectedCheck$ = this.selectedId$.pipe(
      filter(val => val !== undefined),
      switchMap(id => this.monitoringApi.getCheck(id))
    );

    combineLatest(this.createTask, this.modelsFacade.selectedModelVersion$)
      .pipe(
        switchMap(([_, mv]) => {
          return this.api.createTask$(undefined, mv).pipe(
            tap(taskInformation => {
              this.state.next({
                ...this.state.getValue(),
                taskId: taskInformation.Task_id,
              });
            }),
            catchError(err => {
              this.state.next({
                ...this.state.getValue(),
                error: err,
                status: 'FAILED',
              });
              return of();
            })
          );
        }),
        takeUntil(this.destroy.asObservable())
      )
      .subscribe();

    this.taskId$
      .pipe(
        filter(taskId => !!taskId),
        switchMap(taskId => {
          return timer(0, 5000).pipe(
            exhaustMap(() => {
              return this.api.getJobResult$(taskId);
            }),
            tap(task => {
              const status = task.state;
              this.state.next({
                ...this.state.getValue(),
                status,
                result: task.result ? task.result[0].result : undefined,
                colorizers: task.result
                  ? this.buildColorizers(task.result[0].result)
                  : [],
                top100: task.result ? task.result[0].result.top_100 : [],
                counterfactuals: task.result
                  ? task.result[0].result.counterfactuals
                  : [],
                visualizationMetrics: task.result
                  ? task.result[0].result.visualization_metrics
                  : undefined,
                requestsIds: task.result
                  ? task.result[0].result.requests_ids
                  : [],
              });
            }),
            takeWhile(({ state }) => state !== 'SUCCESS'),
            catchError(err => {
              this.state.next({
                ...this.state.getValue(),
                error: err,
                status: 'FAILED',
              });
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

  loadEmbedding(): void {
    this.createTask.next();
  }

  changeColorizer(colorizer: Colorizer): void {
    this.state.next({ ...this.state.getValue(), selectedColorizer: colorizer });
  }

  changeSelectedPointIndex(index: number): void {
    this.state.next({ ...this.state.getValue(), selectedPointIndex: index });
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
    // for (const [, data] of Object.entries(metrics)) {
    //   res.push(this.colorizerFabric.createColorizer('metric', { name: dat }));
    // }
    return res;
  }
}
