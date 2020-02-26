import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisualizationResponse } from '@core/models';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VisualizationApi {
  constructor(private http: HttpClient) {}
  getData$(): Observable<VisualizationResponse> {
    return this.http.get('http://0.0.0.0:1990/vis/vis.json').pipe(
      tap(console.dir),
      catchError(err => {
        console.dir(err);
        return of(null);
      })
    );
  }
}
