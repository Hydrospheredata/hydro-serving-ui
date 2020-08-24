import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { Observable } from '@node_modules/rxjs';
import { DeploymentConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DeploymentConfigsApiService {
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
