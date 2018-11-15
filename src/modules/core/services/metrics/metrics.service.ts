
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { environment } from '@environments/environment';

@Injectable()
export class MetricsService {

  private baseMetricsUrl: string;

  constructor(private http: HttpService) {
    this.baseMetricsUrl = `${environment.monitoringUrl}`;
  }

  public getMetrics(application: number, stage: string, interval: number, metrics: Array<string>, columnIndex) {
    return this.http.get(`${this.baseMetricsUrl}/metrics`, {params: {application, stage, interval, metrics, columnIndex}}, false).pipe(
      map((res: Response): any => {
        return res.json()
      }))
      .toPromise()
  }

  public getHealth() {
    return this.http.get(`${this.baseMetricsUrl}/health`, null, false).pipe(
      map((res: Response): any => {
        return res.json()
      }))
      .toPromise()
  }
}