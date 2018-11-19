
import { Injectable } from '@angular/core';
import { NewHttpService } from '@core/services/new_http/new_http.service';
import { environment } from '@environments/environment';
import { MetricSettings } from '@shared/models/metric-settings.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MetricSettingsService {
  private baseMonitoringSettingsUrl: string;

  constructor(
    private newHttp: NewHttpService
  ) {
    this.baseMonitoringSettingsUrl = `${environment.monitoringUrl}/aggregations`;
  }

  public getMetricSettings(stageId: string): Observable<object[]> {
    return this.newHttp.get(this.baseMonitoringSettingsUrl, {
      params: {
        stageId,
      },
    }).pipe(
      map((res: Response): any => res),
      catchError(_ => {throw new Error('Can\'t fetch data from monitoring service'); })
    );
  }

  public addMetricSettings(metricSettings: MetricSettings): Observable<object> {
    console.log(`MetricSettings: ${metricSettings}`);
    return this.newHttp.post(this.baseMonitoringSettingsUrl, metricSettings).pipe(
      map((res: Response): any => res));
  }

  public deleteMetricSettings(id: string): Observable<object> {
    console.log(`calling DELETE method for ${id}`);
    return this.newHttp.delete(`${this.baseMonitoringSettingsUrl}/${id}`).pipe(
      map((res: Response): any => res));
  }
}
