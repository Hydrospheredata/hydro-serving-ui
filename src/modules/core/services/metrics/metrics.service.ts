import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { environment } from '@environments/environment';

@Injectable()
export class MetricsService {

  private baseMetricsUrl: string;

  constructor(private http: HttpService) {
    this.baseMetricsUrl = `${environment.monitoringUrl}`;
  }

  public getMetrics(application: number, stage: number, interval: number, metrics: Array<string>) {
    return this.http.get(`${this.baseMetricsUrl}/metrics`, {params: {application, stage, interval, metrics}}, false)
      .map((res: Response): any => {
        return res.json()
      })
      .toPromise()
  }

  public getHealth() {
    return this.http.get(`${this.baseMetricsUrl}/health`, null, false)
      .map((res: Response): any => {
        return res.json()
      })
      .toPromise()
  }
}