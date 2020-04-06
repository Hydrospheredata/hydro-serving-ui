import { Injectable } from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { ModelsFacade } from '@models/store';
import { Check } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { ModelVersion } from '@shared/_index';
import { Observable, BehaviorSubject, of, Subject, timer } from 'rxjs';
import {
  map,
  pluck,
  tap,
  switchMap,
  catchError,
  shareReplay,
  distinctUntilChanged,
  exhaustMap,
  takeWhile,
  filter,
  startWith,
} from 'rxjs/operators';
import { ColorizerFabric, Colorizer } from './models/Colorizer';
import { ScatterPlotLegendConfig } from './models/ScatterPlotLegendConfig';
import {
  TaskState,
  VisualizationResponse,
  TaskInformation,
} from './models/visualization';
import { VisualizationApi } from './services/visualization-api.service';

export type ColorBy = 'class_label' | 'metric';
const MockedVisResponse: VisualizationResponse = {
  data_shape: [5, 2],
  data: [
    [-0.1331532746553421, -1.1675983667373657],
    [0.3755553364753723, -1.4538302421569824],
    [-0.9820250868797302, 0.007928095757961273],
    [1.976809024810791, 0.49457478523254395],
    [1.05886709690094, 0.10462985187768936],
  ],
  requests_ids: [7570, 12601, 3659, 2658, 15822],
  top_100: [[1, 2], [0, 3], [0, 4], [1, 2], [3]],
  metrics: {},
  class_labels: {
    confidence: {
      coloring_type: 'gradient',
      data: [
        0.47196451509596193,
        0.5190495596548069,
        0.9319467806068639,
        0.1880573169325348,
        0.5233253319370346,
      ],
    },
  },
  visualization_metrics: {},
};
const MockedTaskResponse: TaskInformation = {
  Task_id: '1',
  state: 'SUCCESS',
  result: [{ result: MockedVisResponse }],
};
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
  legendConfig: ScatterPlotLegendConfig;
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
  legendConfig: undefined,
};

@Injectable()
export class VisualizationFacade {
  state$: Observable<State>;
  taskId$: Observable<string>;
  status$: Observable<TaskState>;
  result$: Observable<VisualizationResponse>;
  error$: Observable<string | null>;
  selectedColorizer$: Observable<Colorizer>;
  selectedPointIndex$: Observable<number>;

  // SCATTERPLOT
  scatterPlotData$: Observable<ScatterPlotData>;
  colors$: Observable<string[]>;
  top100$: Observable<number[][]>;
  modelVersion$: Observable<ModelVersion>;
  selectedCheck$: Observable<Check>;
  colorizers$: Observable<Colorizer[]>;
  legendConfig$: Observable<ScatterPlotLegendConfig>;

  private state: BehaviorSubject<State> = new BehaviorSubject(initialState);
  private createTask: Subject<any> = new Subject();

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
    this.legendConfig$ = this.selectedColorizer$.pipe(
      filter(val => !!val),
      map(colorizer => colorizer.getLegendConfig())
    );

    this.colors$ = this.selectedColorizer$.pipe(
      filter(val => !!val),
      map(colorizer => colorizer.getColors()),
      startWith([]),
      shareReplay(1)
    );
    this.modelVersion$ = this.modelsFacade.selectedModelVersion$;
    // TODO: dynamic select id
    this.selectedCheck$ = of('5e84a88a6839050007b02ac4').pipe(
      switchMap(id => this.monitoringApi.getCheck(id))
    );
    // SIDE EFFECT
    this.createTask
      .pipe(
        switchMap(_ => {
          return this.api.createTask$().pipe(
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
        })
      )
      .subscribe();

    this.taskId$
      .pipe(
        filter(taskId => !!taskId),
        switchMap(taskId => {
          console.log(taskId);
          return timer(0, 5000).pipe(
            exhaustMap(_ => {
              // return this.api.getJobResult$(taskId);
              return of(MockedTaskResponse);
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
        })
      )
      .subscribe();
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
    // for (const [_, data] of Object.entries(metrics)) {
    //   res.push(this.colorizerFabric.createColorizer('metric', { name }));
    // }
    return res;
  }
}
