import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {
  GetChecksAggregationParams,
  GetChecksParams,
  ChecksAggregationResponse,
  Check,
} from '@monitoring/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class MonitoringService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `${environment.monitoringUrl}`;
  }

  public getMonitoringServiceStatus() {
    return this.http.get(`${this.baseUrl}/buildinfo`);
  }

  getCheck(id: string): Observable<Check> {
    return this.http.get<Check>(`${this.baseUrl}/checks/${id}`);
  }
  getChecks({
    modelVersionId,
    from,
    to,
  }: GetChecksParams): Observable<Check[]> {
    return this.http.get(`${this.baseUrl}/checks/${modelVersionId}`, {
      params: { from, to },
    });
  }

  getChecksAggregation({
    modelVersionId,
    limit = 60,
    offset,
  }: GetChecksAggregationParams): Observable<ChecksAggregationResponse> {
    const params = {
      limit: `${limit}`,
      offset: `${offset}`,
    };

    return this.http.get(
      `${this.baseUrl}/checks/aggregates/${modelVersionId}`,
      {
        params,
      }
    );
  }
}
