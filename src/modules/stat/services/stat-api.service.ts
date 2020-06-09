import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { Observable, of } from '@node_modules/rxjs';
import { mockStat } from '../mocks';
import { Stat } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StatApiService {
  private readonly baseUrl: string;
  constructor(private readonly http: HttpService) {
    this.baseUrl = `${environment.statUrl}`;
  }
  getStat(params: { model_version_id: string }): Observable<Stat> {
    return of(mockStat);
    // return this.http.get(`${this.baseUrl}/metrics`, { params });
  }
}
