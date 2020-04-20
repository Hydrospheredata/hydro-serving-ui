import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { MetricSpecification, MetricSpecificationRequest, } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MetricsService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `${environment.apiUrl}/monitoring/metricspec`;
  }

  public getMetricSpecifications(
    modelVersionId: string
  ): Observable<MetricSpecification[]> {
    return this.http
      .get<MetricSpecification[]>(
        `${this.baseUrl}/modelversion/${modelVersionId}`
      )
      .pipe(
        catchError(_ => {
          throw new Error(`Can't fetch data from monitoring service`);
        })
      );
  }

  public addMetricSpecification(
    metricSpecification: MetricSpecificationRequest
  ): Observable<object> {
    return this.http.post(this.baseUrl, metricSpecification).pipe(
      map((res: Response): any => {
        return res;
      })
    );
  }

  public deleteMetricSpecification(id: string): Observable<object> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(map((res: Response): any => res));
  }
}
