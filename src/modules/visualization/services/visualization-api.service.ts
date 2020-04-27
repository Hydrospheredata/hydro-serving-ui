import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskInformation } from '../models/visualization';
import { ModelVersion } from '@shared/models/model-version.model';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  private baseUrl: string;
  constructor(private http: HttpService) {
    this.baseUrl = `${environment.visualizationUrl}`;
  }

  private static get metrics(): ReadonlyArray<string> {
    return [
      'global_score',
      'sammon_error',
      'auc_score',
      'stability_score',
      'msid',
      'clustering',
    ];
  }

  createTask$(
    transformer: string = 'umap',
    modelVersion: ModelVersion
  ): Observable<TaskInformation> {
    return this.http
      .post<TaskInformation>(
        `${this.baseUrl}/plottable_embeddings/${transformer}`,
        {
          model_name: modelVersion.model.name,
          model_version: modelVersion.modelVersion,
          visualization_metrics: VisualizationApi.metrics,
        }
      )
      .pipe(catchError(err => throwError(err)));
  }

  getJobResult$(taskId: string): Observable<TaskInformation> {
    return this.http
      .get<TaskInformation>(`${this.baseUrl}/jobs?task_id=${taskId}`)
      .pipe(catchError(err => throwError(err)));
  }
}
