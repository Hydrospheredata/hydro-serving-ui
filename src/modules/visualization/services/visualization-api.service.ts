import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskInformation } from '../models/visualization';
import { ModelVersion } from '@shared/models/model-version.model';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { VisualizationParams } from '../models/visualization-params';

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  private readonly baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `${environment.visualizationUrl}`;
  }

  createTask(
    transformer: string = 'umap',
    modelVersion: ModelVersion
  ): Observable<TaskInformation> {
    return this.http
      .post<TaskInformation>(
        `${this.baseUrl}/plottable_embeddings/${transformer}?model_version_id=${modelVersion.id}`,
        {}
      )
      .pipe(catchError(err => throwError(err)));
  }

  getJobResult(taskId: string): Observable<TaskInformation> {
    return this.http
      .get<TaskInformation>(`${this.baseUrl}/jobs?task_id=${taskId}`)
      .pipe(catchError(err => throwError(err)));
  }

  setParams(params: VisualizationParams): Observable<any> {
    return this.http.post(`${this.baseUrl}/params`, {
      params,
    });
  }

  getParams(modelVersion: ModelVersion): Observable<VisualizationParams> {
    return this.http.get(`${this.baseUrl}/params`, {
      params: { model_version_id: `${modelVersion.id}` },
    });
  }
}
