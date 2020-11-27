import { Injectable } from '@angular/core';
import { Observable } from '@node_modules/rxjs';
import { Stat } from '../models';
import { HttpService } from '@app/core/data/services/http.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatApiService {
  private readonly baseUrl: string;
  constructor(private readonly http: HttpService) {
    this.baseUrl = `${environment.statUrl}`;
  }
  getStat(params: { model_version_id: string }): Observable<Stat> {
    return this.http.get(`${this.baseUrl}/metrics`, { params });
  }
}
