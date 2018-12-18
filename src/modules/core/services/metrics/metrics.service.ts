
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class MetricsService {

  private baseMetricsUrl: string;

  constructor(
    private http: HttpService
  ) {
    this.baseMetricsUrl = `${environment.monitoringUrl}`;
  }

  public getMetrics(
    application: string,
    stage: string,
    interval: string,
    metrics: string[],
    columnIndex?: string
    ) {
      return this.http.get(
          `${this.baseMetricsUrl}/metrics`,
          { params: {
              application,
              stage,
              interval,
              metrics,
              columnIndex,
            },
          }
        ).pipe(
          map((res: Response): any => res)
        ).toPromise();
  }

  public getHealth() {
    return this.http.get(`${this.baseMetricsUrl}/health`).pipe(
      map((res: Response): any => res)
    ).toPromise();
  }
}
