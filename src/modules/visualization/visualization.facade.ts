import { Injectable } from '@angular/core';
import { VisualizationResponse, Labels } from '@core/models/visualization';
import { VisualizationApi } from '@core/services/visualization-api.service';
import { Observable } from 'rxjs';
import { refCount, publishReplay, map, filter, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisualizationFacade {
  response$: Observable<VisualizationResponse> = this.api
    .getData$()
    .pipe(publishReplay(1), refCount());
  visualizationLabels$: Observable<Labels> = this.response$.pipe(
    pluck('labels')
  );
  visualizationLabelNames$: Observable<
    string[]
  > = this.visualizationLabels$.pipe(map(Object.keys));
  constructor(private api: VisualizationApi) {}
}
