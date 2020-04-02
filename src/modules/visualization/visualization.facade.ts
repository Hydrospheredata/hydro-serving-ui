import { Injectable } from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { ModelsFacade } from '@models/store';
import { Check } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { ModelVersion } from '@shared/_index';
import {
  Observable,
  BehaviorSubject,
  of,
  combineLatest,
  Subject,
  timer,
  never,
} from 'rxjs';
import {
  refCount,
  publishReplay,
  map,
  pluck,
  tap,
  switchMap,
  catchError,
  shareReplay,
  take,
  distinctUntilChanged,
  exhaustMap,
  takeWhile,
  filter,
} from 'rxjs/operators';
import {
  TaskState,
  VisualizationResponse,
  ClassLabel,
  Colorizer,
} from './models/visualization';
import { ColorizerBuilder } from './services/colorizer.builder';
import { VisualizationApi } from './services/visualization-api.service';

export type ColorBy = 'class_label' | 'metric';

export interface State {
  taskId: string | null;
  result: VisualizationResponse | null;
  error: string | null;
  status: TaskState;
  colorBy: ColorBy;
}

const initialState: State = {
  taskId: null,
  result: null,
  error: null,
  status: 'PENDING',
  colorBy: 'class_label',
};

@Injectable()
export class VisualizationFacade {
  state$: Observable<State>;
  loading$: Observable<boolean>;
  taskId$: Observable<string>;
  status$: Observable<TaskState>;
  result$: Observable<VisualizationResponse>;
  error$: Observable<string | null>;
  // SETTINGS
  colorBy$: Observable<ColorBy>;
  // SCATTERPLOT
  scatterPlotData$: Observable<ScatterPlotData>;
  colors$: Observable<string[]>;
  top100$: Observable<number[][]>;
  labels$: Observable<VisualizationResponse['class_labels']>;
  labelsNames$: Observable<string[]>;
  modelVersion$: Observable<ModelVersion>;
  selectedCheck$: Observable<Check>;
  private state: BehaviorSubject<State> = new BehaviorSubject(initialState);
  private createTask: Subject<any> = new Subject();

  // labelsNames$: Observable<string[]> = this.labels$.pipe(map(Object.keys));
  // metrics$ = this.response$.pipe(pluck('metrics'));
  // metricsNames$: Observable<string[]> = this.metrics$.pipe(map(Object.keys));
  // top100$ = this.response$.pipe(pluck('top_100'));
  // requestsIds$ = this.response$.pipe(pluck('requests_ids'));
  // loading$: Observable<boolean>;
  // private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private api: VisualizationApi,
    private monitoringApi: MonitoringService,
    private modelsFacade: ModelsFacade,
    private colorizerBuilder: ColorizerBuilder
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
    this.colorBy$ = this.state$.pipe(pluck('colorBy'), distinctUntilChanged());
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
    this.colorBy$ = this.state.pipe(pluck('colorBy'), distinctUntilChanged());
    this.colors$ = this.colorBy$.pipe(
      switchMap(colorBy => {
        switch (colorBy) {
          case 'class_label':
          // return this.colorsByClassLabel$();
          case 'metric':
          // return this.colorsByMetric$();
          default:
            break;
        }
        return this.colorsByClassLabel$();
      })
    );
    this.labels$ = this.result$.pipe(pluck('class_labels'));
    this.labelsNames$ = this.labels$.pipe(map(Object.keys));
    this.modelVersion$ = this.modelsFacade.selectedModelVersion$;
    this.selectedCheck$ = of('5e84a88a6839050007b02ac4').pipe(
      switchMap(id => this.monitoringApi.getCheck(id))
    );
    // SIDE EFFECT
    this.createTask
      .pipe(
        tap(_ => console.log('create task')),
        switchMap(_ => {
          return this.api.createTask$().pipe(
            tap(taskInformation => {
              this.state.next({
                ...this.state.getValue(),
                taskId: taskInformation.Task_id,
              });
            }),
            // catchError(err => {
            //   this.state.next({
            //     ...this.state.getValue(),
            //     error: err,
            //     status: 'FAILED',
            //   });
            //   return never();
            // })
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
    // this.loading$ = this.loading.asObservable();
  }

  loadEmbedding(): void {
    this.createTask.next();
  }

  changeColorBy(colorBy: ColorBy): void {
    this.state.next({ ...this.state.getValue(), colorBy });
  }

  changeSelectedClassLabel(classLabel: string): void {}

  private colorsByClassLabel$(): Observable<string[]> {
    return of([]);
    return combineLatest(this.labels$, of('class')).pipe(
      map(([labels, selectedLabel]) => {
        const classLabel: ClassLabel = labels[selectedLabel];
        if (classLabel === undefined) {
          return [];
        }

        const colorizer: Colorizer = this.colorizerBuilder.build(classLabel);
        return colorizer.getColors();
      })
    );
  }
  private colorsByMetric$(): Observable<string[]> {
    return of([]);
    // return this.selectedMetric$.pipe(
    //   map(metric => {
    //     if (metric === undefined) {
    //       return [];
    //     }
    //     const colors = this.colorizerBuilder
    //       .buildMetricColorizer(metric)
    //       .getColors();
    //     console.dir(colors);
    //     return colors;
    //   })
    // );
  }
}
