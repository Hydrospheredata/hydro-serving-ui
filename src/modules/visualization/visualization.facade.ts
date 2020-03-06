import { Injectable } from '@angular/core';
import { VisualizationResponse } from '@core/models/visualization';
import { VisualizationApi } from '@core/services/visualization-api.service';
import { Check } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import {
  refCount,
  publishReplay,
  map,
  pluck,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ModelVersion } from '@shared/_index';
import { ModelsFacade } from '@models/store';

@Injectable({
  providedIn: 'root',
})
export class VisualizationFacade {
  transformer$: Observable<string> = of('umap');
  response$: Observable<VisualizationResponse> = combineLatest(
    this.transformer$
  ).pipe(
    tap(() => this.loading.next(true)),
    switchMap(([transformer]) =>
      this.api.getData$(transformer).pipe(
        tap(_ => {
          this.loading.next(false);
        }),
        catchError(_ => {
          this.loading.next(false);
          return of({} as VisualizationResponse);
        })
      )
    ),
    publishReplay(1),
    refCount()
  );

  labels$ = this.response$.pipe(pluck('class_labels'));
  labelsNames$: Observable<string[]> = this.labels$.pipe(map(Object.keys));
  metrics$ = this.response$.pipe(pluck('metrics'));
  metricsNames$: Observable<string[]> = this.metrics$.pipe(map(Object.keys));
  top100$ = this.response$.pipe(pluck('top_100'));
  requestsIds$ = this.response$.pipe(pluck('requests_ids'));
  loading$: Observable<boolean>;
  selectedRequest$: Observable<Check> = of('5e61083137f9260008df2473').pipe(
    switchMap(id => this.monitoringApi.getCheck(id))
  );
  modelVersion$: Observable<ModelVersion> = this.modelsFacade.selectedModelVersion$;
  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private api: VisualizationApi,
    private monitoringApi: MonitoringService,
    private modelsFacade: ModelsFacade,
  ) {
    this.loading$ = this.loading.asObservable();
  }
}
