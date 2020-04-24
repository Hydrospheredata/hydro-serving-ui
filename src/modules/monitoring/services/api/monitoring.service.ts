import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {
  Check,
  ChecksAggregationResponse,
  GetChecksAggregationParams,
  GetChecksParams,
} from '@monitoring/interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
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
    limit = 90,
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

  getChecksForComparision(params: {
    originalModelVersion: number;
    aggregationId: String;
    comparedModelVersionId: number;
  }): Observable<Check[]> {
    const {
      originalModelVersion: omv,
      aggregationId: aggId,
      comparedModelVersionId: cmv,
    } = params;

    return this.http.get(
      `${this.baseUrl}/checks/comparision/${omv}/${aggId}/${cmv}`
    );
  }
}
