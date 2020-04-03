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
import { TaskState, VisualizationResponse } from './models/visualization';
import { VisualizationApi } from './services/visualization-api.service';

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
          coloring_type: payload.coloring_type,
        })
      );
    }
    // for (const [_, data] of Object.entries(metrics)) {
    //   res.push(this.colorizerFabric.createColorizer('metric', { name }));
    // }
    return res;
  }
}
