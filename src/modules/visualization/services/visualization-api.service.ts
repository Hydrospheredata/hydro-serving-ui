import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskInformation } from '../models/visualization';
import { ModelVersion } from "@shared/models/model-version.model";

@Injectable({providedIn: 'root'})
export class VisualizationApi {
  constructor(private http: HttpClient) {
  }

  private get metrics(): ReadonlyArray<string> {
    return [
      'global_score',
      'sammon_error',
      'auc_score',
      'stability_score',
      'msid',
      'clustering',
    ]
  }

  createTask$(transformer: string = 'umap', modelVersion: ModelVersion): Observable<TaskInformation> {
    return this.http
      .post<TaskInformation>(
        `http://localhost:5000/plottable_embeddings/${transformer}`,
        {
          model_name: modelVersion.model.name,
          model_version: modelVersion.id,
          visualization_metrics: this.metrics,
          data: {
            "bucket": "hydro-vis",
            "production_data_file": "adult/requests.parquet",
            "profile_data_file": "adult/training.parquet"
          }
        }
      )
      .pipe(catchError(err => throwError(err)));
  }

  getJobResult$(taskId: string): Observable<TaskInformation> {
    return this.http.get<TaskInformation>(
      `http://localhost:5000/jobs?task_id=${taskId}`
    ).pipe(catchError(err => throwError(err)));
  }
}
