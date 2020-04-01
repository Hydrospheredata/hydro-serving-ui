import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskInformation } from '../models/visualization';

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  constructor(private http: HttpClient) {}
  createTask$(transformer: string = 'umap'): Observable<TaskInformation> {
    const body = {
      model_name: 'adult_scalar',
      model_version: 1,
      data: {
        bucket: 'hydro-vis',
        production_data_file: 'adult/requests.parquet',
        profile_data_file: 'adult/training.parquet',
      },
      visualization_metrics: [
        'global_score',
        'sammon_error',
        'auc_score',
        'stability_score',
        'msid',
        'clustering',
      ],
    };

    return this.http
      .post<TaskInformation>(
        `http://localhost:5000/plottable_embeddings/${transformer}`,
        body
      )
      .pipe(catchError(err => throwError(err)));
  }

  getJobResult$(taskId: string): Observable<TaskInformation> {
    return this.http.get<TaskInformation>(
      `http://localhost:5000/jobs?task_id=${taskId}`
    );
  }
}
