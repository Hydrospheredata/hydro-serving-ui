import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {
  IMetricSpecificationRequest,
  MetricSpecification,
} from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MetricsService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `${environment.monitoringUrl}/metricspec`;
  }

  public getMetricSpecifications(
    modelVersionId: string
  ): Observable<MetricSpecification[]> {
    return this.http.get(`${this.baseUrl}/modelversion/${modelVersionId}`).pipe(
      catchError(_ => {
        throw new Error(`Can't fetch data from monitoring service`);
      })
    );
  }

  public addMetricSpecification(
    metricSpecification: IMetricSpecificationRequest
  ): Observable<object> {
    return this.http.post(this.baseUrl, metricSpecification).pipe(
      map((res: Response): any => {
        return res;
      })
    );
  }

  public editMetricSpecification(
    metricSpecification: IMetricSpecificationRequest
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
