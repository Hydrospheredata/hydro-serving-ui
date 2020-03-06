import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisualizationResponse } from '@core/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  constructor(private http: HttpClient) {}
  getData$(transformer: string = 'umap'): Observable<VisualizationResponse> {
    const body = {
      model_name: 'adult_scalar',
      model_version: 1,
      data: {
        bucket: 'hydro-vis',
        requests_file: 'adult/requests.parquet',
        profile_file: 'adult/training.parquet',
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
      .post<VisualizationResponse>(
        `http://localhost:5000/plottable_embeddings/${transformer}`,
        body
      )
      .pipe(catchError(err => throwError(err)));
  }
}
