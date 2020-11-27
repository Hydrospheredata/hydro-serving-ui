import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { HttpService } from '@app/core/data/services/http.service';
import { Observable } from 'rxjs';

import { DeploymentConfig } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DeploymentConfigsService {
  private readonly baseAPIUrl = `${environment.apiUrl}/deployment_configuration`;

  constructor(private readonly http: HttpService) {}

  getAll(): Observable<DeploymentConfig[]> {
    return this.http.get<DeploymentConfig[]>(this.baseAPIUrl);
  }

  get(name: string): Observable<DeploymentConfig> {
    return this.http.get<DeploymentConfig>(`${this.baseAPIUrl}/${name}`);
  }

  delete(name: string): Observable<any> {
    return this.http.delete(`${this.baseAPIUrl}/${name}`);
  }
}
