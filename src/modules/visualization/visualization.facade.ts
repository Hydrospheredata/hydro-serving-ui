import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { refCount, publishReplay } from 'rxjs/operators';
import { VisualizationApi } from './api/visualizationApi.service';

@Injectable({
  providedIn: 'root',
})
export class VisualizationFacade {
  data$: Observable<any>;
  constructor(private api: VisualizationApi) {
    this.data$ = api.getData$().pipe(publishReplay(1), refCount());
  }
}
