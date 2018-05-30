import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { environment } from '@environments/environment';


@Injectable()
export class MetricSettingsService {
  private baseMonitoringSettingsUrl: string;

  constructor(private http: HttpService) {
    this.baseMonitoringSettingsUrl = `${environment.monitoringUrl}/aggregations`;
  }

  public getMetricSettings(stageId: string) {
    console.log(stageId)
    return this.http.get(this.baseMonitoringSettingsUrl, {params: {stageId}})
      .map((res: Response): any => {
        return res.json()
      })
  }
}
