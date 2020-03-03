import { Injectable } from '@angular/core';
import { VisualizationResponse } from '@core/models/visualization';
import { VisualizationApi } from '@core/services/visualization-api.service';
import { Observable, BehaviorSubject, of, combineLatest, EMPTY } from 'rxjs';
import {
  refCount,
  publishReplay,
  map,
  pluck,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';

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
        tap(res => {
          this.loading.next(false);
          console.dir(res);
        }),

        catchError(err => {
          this.loading.next(false);
          console.error(err);
          // TODO: fix it
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
  metricsNames$: Observable<string[]> = this.metrics$.pipe(
    map(Object.keys)
  );

  loading$: Observable<boolean>;
  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private api: VisualizationApi) {
    this.loading$ = this.loading.asObservable();
  }
}
