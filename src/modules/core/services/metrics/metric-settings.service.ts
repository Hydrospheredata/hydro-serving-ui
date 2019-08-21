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
export class MetricSettingsService {
  private baseMonitoringSettingsUrl: string;

  constructor(private http: HttpService) {
    this.baseMonitoringSettingsUrl = `${environment.monitoringUrl}/metricspec`;
  }

  public getMetricSettings(
    modelVersionId: string
  ): Observable<MetricSpecification[]> {
    return this.http
      .get(`${this.baseMonitoringSettingsUrl}/modelversion/${modelVersionId}`)
      .pipe(
        catchError(_ => {
          throw new Error(`Can't fetch data from monitoring service`);
        })
      );
  }

  public addMetricSettings(
    metricSpecification: IMetricSpecificationRequest
  ): Observable<object> {
    return this.http
      .post(this.baseMonitoringSettingsUrl, metricSpecification)
      .pipe(
        map(
          (res: Response): any => {
            return res;
          }
        )
      );
  }

  public editMetricSettings(
    metricSpecification: IMetricSpecificationRequest
  ): Observable<object> {
    return this.http
      .post(this.baseMonitoringSettingsUrl, metricSpecification)
      .pipe(
        map(
          (res: Response): any => {
            return res;
          }
        )
      );
  }

  public deleteMetricSettings(id: string): Observable<object> {
    return this.http
      .delete(`${this.baseMonitoringSettingsUrl}/${id}`)
      .pipe(map((res: Response): any => res));
  }
}
