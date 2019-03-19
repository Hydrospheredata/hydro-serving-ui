
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
    modelVersionId: string,
    interval: string,
    metrics: string[],
    columnIndex?: string
    ) {
      return this.http.get(
          `${this.baseMetricsUrl}/metrics`,
          { params: {
              modelVersionId,
              interval,
              metrics,
              columnIndex,
            },
          }
        ).pipe(
          map((res: Response): any => res)
        ).toPromise();
  }

  // TODO: do not work
  public getHealth() {
    return this.http.get(`${this.baseMetricsUrl}/health`).pipe(
      map((res: Response): any => res)
    ).toPromise();
  }
}
