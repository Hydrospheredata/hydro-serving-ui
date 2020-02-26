import { Injectable } from '@angular/core';
import { VisualizationResponse } from '@core/models/visualization';
import { VisualizationApi } from '@core/services/visualization-api.service';
import { Observable } from 'rxjs';
import { refCount, publishReplay, map, filter, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisualizationFacade {
  response$: Observable<VisualizationResponse> = this.api
    .getData$()
    .pipe(tap(console.dir), publishReplay(1), refCount());
  visualizationLabels$: Observable<any> = this.response$.pipe(
    pluck('class_labels')
  );
  visualizationLabelNames$: Observable<
    string[]
  > = this.visualizationLabels$.pipe(map(Object.keys));
  constructor(private api: VisualizationApi) {}
}
