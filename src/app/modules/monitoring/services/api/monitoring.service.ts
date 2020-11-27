import { Injectable } from '@angular/core';
import { HttpService } from '@app/core/data/services/http.service';
import { environment } from '@environments/environment';

import { BareCheck, ChecksAggregationResponse } from '../../models';
import { Observable } from 'rxjs';

export interface GetChecksAggregationParams {
  modelVersionId: number;
  limit?: number;
  offset?: number;
  from?: string;
  to?: string;
}
interface GetChecksParams {
  modelVersionId: number;
  from: string;
  to: string;
}

@Injectable({ providedIn: 'root' })
export class MonitoringService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `${environment.monitoringUrl}`;
  }

  public getMonitoringServiceStatus() {
    return this.http.get(`${this.baseUrl}/buildinfo`);
  }

  getCheck(id: string): Observable<BareCheck> {
    return this.http.get<BareCheck>(`${this.baseUrl}/checks/${id}`);
  }

  getChecks({
    modelVersionId,
    from,
    to,
  }: GetChecksParams): Observable<BareCheck[]> {
    return this.http.get(`${this.baseUrl}/checks/${modelVersionId}`, {
      params: { from, to },
    });
  }

  getChecksAggregation({
    modelVersionId,
    limit = 90,
    offset,
    from,
    to,
  }: GetChecksAggregationParams): Observable<ChecksAggregationResponse> {
    const params = {
      limit: `${limit}`,
      offset: `${offset}`,
      from,
      till: to,
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
  }): Observable<BareCheck[]> {
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
