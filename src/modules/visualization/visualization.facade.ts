import { Injectable } from '@angular/core';
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
} from 'rxjs/operators';
import { VisualizationApi } from './services/visualization-api.service';

enum Status {
  SUCCESS,
  LOADING,
}
export interface State {
  loading: boolean;
  taskId: string | null;
  result: any;
  error: string | null;
}

const initialState: State = {
  loading: false,
  taskId: null,
  result: null,
  error: null,
};

@Injectable()
export class VisualizationFacade {
  state$: Observable<State>;
  loading$: Observable<boolean>;
  taskId$: Observable<string>;
  private state: BehaviorSubject<State> = new BehaviorSubject(initialState);
  private createTask: Subject<any> = new Subject();

  // transformer$: Observable<string> = of('umap');
  // response$: Observable<VisualizationResponse> = combineLatest(
  //   this.transformer$
  // ).pipe(
  //   tap(() => this.loading.next(true)),
  //   switchMap(([transformer]) =>
  //     this.api.getData$(transformer).pipe(
  //       tap(_ => {
  //         this.loading.next(false);
  //       }),
  //       catchError(_ => {
  //         this.loading.next(false);
  //         return of({} as VisualizationResponse);
  //       })
  //     )
  //   ),
  //   publishReplay(1),
  //   refCount()
  // );

  // labels$ = this.response$.pipe(pluck('class_labels'));
  // labelsNames$: Observable<string[]> = this.labels$.pipe(map(Object.keys));
  // metrics$ = this.response$.pipe(pluck('metrics'));
  // metricsNames$: Observable<string[]> = this.metrics$.pipe(map(Object.keys));
  // top100$ = this.response$.pipe(pluck('top_100'));
  // requestsIds$ = this.response$.pipe(pluck('requests_ids'));
  // loading$: Observable<boolean>;
  // selectedRequest$: Observable<Check> = of('5e61083137f9260008df2473').pipe(
  //   switchMap(id => this.monitoringApi.getCheck(id))
  // );
  // modelVersion$: Observable<ModelVersion> = this.modelsFacade
  //   .selectedModelVersion$;
  // private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private api: VisualizationApi,
    private monitoringApi: MonitoringService,
    private modelsFacade: ModelsFacade
  ) {
    this.state$ = this.state.asObservable().pipe(shareReplay(1));
    this.loading$ = this.state$.pipe(pluck('loading'));
    this.taskId$ = this.state$.pipe(pluck('taskId'), distinctUntilChanged());
    this.createTask
      .pipe(
        tap(_ => {
          this.state.next({ ...this.state.getValue(), loading: true });
        }),
        switchMap(_ => {
          return this.api.createTask$().pipe(
            tap(taskInformation => {
              this.state.next({
                ...this.state.getValue(),
                taskId: taskInformation.Task_id,
              });
            })
          );
        })
      )
      .subscribe();

    this.taskId$
      .pipe(
        tap(_ => {
          console.log(`Task id changed on: ${_}`);
        }),
        switchMap(taskId => {
          return timer(0, 5000).pipe(
            exhaustMap(i => this.api.getJobResult$(taskId).pipe(map(task => {
              console.log(task);
            })))
          );
        })
      )
      .subscribe();
    // this.loading$ = this.loading.asObservable();
  }

  loadEmbedding(): void {
    this.createTask.next();
  }
}
