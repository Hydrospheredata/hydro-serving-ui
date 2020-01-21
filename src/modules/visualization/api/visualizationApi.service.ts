import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Labels {
  ground_truth: number[];
  predicted: number[];
  confidences: number[];
  anomaly_label: number[];
  outlier_confidence: number[];
}
interface GetVisualizationResponse {
  data_shape: [number, number];
  data: Array<[number, number]>;
  labels: Labels;
  top_100: number[][];
}

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  constructor(private http: HttpClient) {}
  getData$(): Observable<GetVisualizationResponse | null> {
    return this.http.get('http://0.0.0.0:1990/vis/vis.json').pipe(
      catchError(err => {
        console.dir(err);
        return of(null);
      })
    );
  }
}
