import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisualizationResponse } from '@core/models';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpService } from './http';

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  constructor(private http: HttpClient) {}
  getData$(): Observable<VisualizationResponse> {
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
      .post('http://localhost:5000/plottable_embeddings/umap', body)
      .pipe(
        tap(console.dir),
        catchError(err => {
          console.dir(err);
          return of(null);
        })
      );
  }
}
