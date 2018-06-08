import { Observable } from 'rxjs/Observable';
import { MetricSettings } from '@shared/models/metric-settings.model';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { environment } from '@environments/environment';


@Injectable()
export class MetricSettingsService {
  private baseMonitoringSettingsUrl: string;

  constructor(private http: HttpService) {
    this.baseMonitoringSettingsUrl = `${environment.monitoringUrl}/aggregations`;
  }

  public getMetricSettings(stageId: string): Observable<Object[]> {
    console.log(stageId)
    return this.http.get(this.baseMonitoringSettingsUrl, {params: {stageId}})
      .map((res: Response): any => {
        return res.json()
      })
  }

  public addMetricSettings(metricSettings: MetricSettings): Observable<Object> {
    console.log(metricSettings);
    return this.http.post(this.baseMonitoringSettingsUrl, metricSettings)
      .map((res: Response): any => {
        return res.json();
      })
  }

  public deleteMetricSettings(id: string): Observable<Object> {
    console.log(`calling DELETE method for ${id}`);
    return this.http.delete(`${this.baseMonitoringSettingsUrl}/${id}`)
      .map((res: Response): any => {
        return res.json();
      })
  }
}
