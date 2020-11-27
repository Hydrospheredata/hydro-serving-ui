import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ModelVersion } from '@app/core/data/types';
import { HttpService } from '@app/core/data/services/http.service';

import { TaskInformation } from '../models/visualization';
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
        `${this.baseUrl}/plottable_embeddings/${transformer}`,
        {
          model_version_id: modelVersion.id,
        }
      )
      .pipe(catchError(err => throwError(err)));
  }

  getJobResult(taskId: string): Observable<TaskInformation> {
    return this.http
      .get<TaskInformation>(`${this.baseUrl}/jobs?task_id=${taskId}`)
      .pipe(catchError(err => throwError(err)));
  }

  setParams(
    params: VisualizationParams,
    modelVersion: ModelVersion
  ): Observable<any> {
    const method = 'umap';
    const body = {
      model_version_id: modelVersion.id,
      ...params,
    };

    return this.http.post(`${this.baseUrl}/params/${method}`, body);
  }

  getParams(modelVersionId: number): Observable<VisualizationParams> {
    const method = 'umap';

    return this.http.get(`${this.baseUrl}/params/${method}`, {
      params: { model_version_id: `${modelVersionId}` },
    });
  }
}
